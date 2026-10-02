import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI client if key exists
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Local mathematical fallback solver for 7th grade math
function solveMathLocally(rawQuestion: string): {
  success: boolean;
  category: string;
  steps: string[];
  answer: string;
  tips?: string;
} {
  const q = rawQuestion.trim();

  // 1. Linear equation solver: e.g., 2x + 5 = 17, 3x - 6 = 12, 5x = 25, 4x + 10 = 2x + 20
  const eqMatch = q.match(/^([+-]?\s*\d*\.?\d*)\s*([a-zA-Z])\s*([+-]\s*\d+\.?\d*)?\s*=\s*([+-]?\s*\d*\.?\d*)\s*([a-zA-Z])?\s*([+-]\s*\d+\.?\d*)?$/);
  if (eqMatch) {
    const varName = eqMatch[2] || eqMatch[5] || 'x';
    // Parse left side
    let a1Str = (eqMatch[1] || '').replace(/\s+/g, '');
    let a1 = 0;
    if (a1Str === '' || a1Str === '+') a1 = 1;
    else if (a1Str === '-') a1 = -1;
    else a1 = parseFloat(a1Str) || 0;

    let b1Str = (eqMatch[3] || '').replace(/\s+/g, '');
    let b1 = parseFloat(b1Str) || 0;

    // Parse right side
    let a2Str = (eqMatch[4] || '').replace(/\s+/g, '');
    let a2 = 0;
    let b2 = 0;

    if (eqMatch[5]) {
      // Right side has variable
      if (a2Str === '' || a2Str === '+') a2 = 1;
      else if (a2Str === '-') a2 = -1;
      else a2 = parseFloat(a2Str) || 0;

      let b2Str = (eqMatch[6] || '').replace(/\s+/g, '');
      b2 = parseFloat(b2Str) || 0;
    } else {
      // Right side is just a constant
      b2 = parseFloat(a2Str) || 0;
    }

    const netA = a1 - a2;
    const netB = b2 - b1;

    if (netA === 0) {
      if (netB === 0) {
        return {
          success: true,
          category: 'Bir o‘zgaruvchili tenglama',
          steps: [
            `Berilgan tenglama: ${q}`,
            `O'zgaruvchilarni chapga, sonlarni o'ng tomonga o'tkazamiz: (${a1} - ${a2})${varName} = ${b2} - (${b1})`,
            `0 · ${varName} = 0`,
            `Natija: Har qanday haqiqiy son tenglamaning ildizi hisoblanadi.`,
          ],
          answer: `${varName} ∈ R (cheksiz ko'p yechim)`,
          tips: "Nolga ko'paytirilgan har qanday son nolga teng bo'lgani sababli, tenglama cheksiz yechimga ega.",
        };
      } else {
        return {
          success: true,
          category: 'Bir o‘zgaruvchili tenglama',
          steps: [
            `Berilgan tenglama: ${q}`,
            `O'zgaruvchilarni guruhlaymiz: 0 · ${varName} = ${netB}`,
            `Nolga teng bo'lmagan son hosil bo'ldi. Tenglama yechimga ega emas.`,
          ],
          answer: 'Yechim yo‘q (bo‘sh to‘plam ∅)',
          tips: "Nolga bo'lish mumkin emas.",
        };
      }
    }

    const sol = netB / netA;
    const formattedSol = Number.isInteger(sol) ? sol.toString() : sol.toFixed(2).replace(/\.00$/, '');

    const steps = [
      `1. Berilgan tenglama: ${q}`,
      `2. O'zgaruvchili hadlarni tenglikning chap tomoniga, ozod sonlarni esa o'ng tomoniga ishoralarini teskarisiga o'zgartirib o'tkazamiz:`,
      `   ${a1 !== netA ? `${a1}${varName} - (${a2}${varName})` : `${netA}${varName}`} = ${b2} - (${b1})`,
      `   ${netA}${varName} = ${netB}`,
      `3. Tenglikning ikkala qismini o'zgaruvchi oldidagi koeffitsiyentga (${netA}) bo'lamiz:`,
      `   ${varName} = ${netB} ÷ ${netA}`,
      `   ${varName} = ${formattedSol}`,
      `4. Tekshirish: Tenglamaga ${varName} = ${formattedSol} qo'yilganda tenglik to'g'ri bo'ladi.`,
    ];

    return {
      success: true,
      category: 'Chiziqli tenglama',
      steps,
      answer: `${varName} = ${formattedSol}`,
      tips: "Tenglamalarni yechishda ozod sonlar qarama-qarshi ishora bilan o'ng tomonga o'tkaziladi.",
    };
  }

  // 2. Fraction addition/subtraction: e.g. 3/4 + 2/5 or 5/6 - 1/3
  const fracMatch = q.match(/^(\d+)\/(\d+)\s*([\+\-\*\/])\s*(\d+)\/(\d+)$/);
  if (fracMatch) {
    const num1 = parseInt(fracMatch[1], 10);
    const den1 = parseInt(fracMatch[2], 10);
    const op = fracMatch[3];
    const num2 = parseInt(fracMatch[4], 10);
    const den2 = parseInt(fracMatch[5], 10);

    const gcd = (x: number, y: number): number => (!y ? Math.abs(x) : gcd(y, x % y));
    const lcm = (x: number, y: number): number => Math.abs(x * y) / gcd(x, y);

    if (op === '+' || op === '-') {
      const commonDen = lcm(den1, den2);
      const factor1 = commonDen / den1;
      const factor2 = commonDen / den2;
      const newNum1 = num1 * factor1;
      const newNum2 = num2 * factor2;
      const resultNum = op === '+' ? newNum1 + newNum2 : newNum1 - newNum2;
      const g = gcd(resultNum, commonDen);
      const finalNum = resultNum / g;
      const finalDen = commonDen / g;

      return {
        success: true,
        category: 'Kasrlar ustida amallar',
        steps: [
          `1. Berilgan ifoda: ${num1}/${den1} ${op} ${num2}/${den2}`,
          `2. Maxrajlar (${den1} va ${den2}) uchun eng kichik umumiy karrali (EKUK) topiladi: EKUK(${den1}, ${den2}) = ${commonDen}`,
          `3. Qo'shimcha ko'paytuvchilar: birinchi kasr uchun ${commonDen} ÷ ${den1} = ${factor1}, ikkinchi kasr uchun ${commonDen} ÷ ${den2} = ${factor2}`,
          `4. Kasrlarni umumiy maxrajga keltiramiz: (${num1}×${factor1})/${commonDen} ${op} (${num2}×${factor2})/${commonDen} = ${newNum1}/${commonDen} ${op} ${newNum2}/${commonDen}`,
          `5. Suratlarni ${op === '+' ? "qo'shamiz" : "ayiramiz"}: (${newNum1} ${op} ${newNum2}) / ${commonDen} = ${resultNum}/${commonDen}`,
          g > 1 ? `6. Kasrni ${g} ga qisqartiramiz: ${resultNum}÷${g} / ${commonDen}÷${g} = ${finalNum}/${finalDen}` : `6. Kasr qisqarmaydigan holatda: ${finalNum}/${finalDen}`,
        ],
        answer: finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`,
        tips: "Kasrlarni qo'shish va ayirishda har doim umumiy maxraj topiladi.",
      };
    } else if (op === '*') {
      const prodNum = num1 * num2;
      const prodDen = den1 * den2;
      const g = gcd(prodNum, prodDen);
      const finalNum = prodNum / g;
      const finalDen = prodDen / g;
      return {
        success: true,
        category: 'Kasrlarni ko‘paytirish',
        steps: [
          `1. Berilgan ifoda: (${num1}/${den1}) × (${num2}/${den2})`,
          `2. Qoida: Kasrlar ko'paytirilganda suratlar suratga, maxrajlar maxrajga ko'paytiriladi.`,
          `3. Hisoblash: (${num1} × ${num2}) / (${den1} × ${den2}) = ${prodNum} / ${prodDen}`,
          g > 1 ? `4. Kasrni ${g} ga qisqartiramiz: ${finalNum} / ${finalDen}` : `4. Kasr qisqarmas shaklda: ${finalNum} / ${finalDen}`,
        ],
        answer: finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`,
        tips: "Ko'paytirishda oldin surat va maxrajni qisqartirish mumkin.",
      };
    } else if (op === '/') {
      const prodNum = num1 * den2;
      const prodDen = den1 * num2;
      const g = gcd(prodNum, prodDen);
      const finalNum = prodNum / g;
      const finalDen = prodDen / g;
      return {
        success: true,
        category: 'Kasrlarni bo‘lish',
        steps: [
          `1. Berilgan ifoda: (${num1}/${den1}) ÷ (${num2}/${den2})`,
          `2. Qoida: Birinchi kasr o'zgarishsiz qoldirilib, ikkinchi kasr teskarisiga aylantiriladi va ko'paytiriladi:`,
          `   (${num1}/${den1}) × (${den2}/${num2})`,
          `3. Hisoblash: (${num1} × ${den2}) / (${den1} × ${num2}) = ${prodNum} / ${prodDen}`,
          g > 1 ? `4. Kasrni ${g} ga qisqartiramiz: ${finalNum} / ${finalDen}` : `4. Kasr qisqarmas shaklda: ${finalNum} / ${finalDen}`,
        ],
        answer: finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`,
        tips: "Kasrni kasrga bo'lishda ikkinchi kasr teskarisiga o'girilib ko'paytiriladi.",
      };
    }
  }

  // 3. Percentage question: e.g. 150 ning 20% i or 20% of 150
  const pctMatch1 = q.match(/(\d+\.?\d*)\s*(?:ning)?\s*(\d+\.?\d*)\s*%/i);
  const pctMatch2 = q.match(/(\d+\.?\d*)\s*%\s*(?:of|ning)?\s*(\d+\.?\d*)/i);
  if (pctMatch1 || pctMatch2) {
    const total = parseFloat((pctMatch1 ? pctMatch1[1] : pctMatch2![2]));
    const pct = parseFloat((pctMatch1 ? pctMatch1[2] : pctMatch2![1]));
    const val = (total * pct) / 100;
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(2);
    return {
      success: true,
      category: 'Foizlar',
      steps: [
        `1. Berilgan: Son = ${total}, Topilishi kerak bo'lgan foiz = ${pct}%`,
        `2. Foiz qoidasi: Sonning p% ini topish uchun sonni p ga ko'paytirib, 100 ga bo'lamiz:`,
        `   Formula: Natija = (Son × Foiz) ÷ 100`,
        `3. Hisoblash: (${total} × ${pct}) ÷ 100 = ${total * pct} ÷ 100`,
        `4. Natija: ${formatted}`,
      ],
      answer: `${formatted}`,
      tips: `1% bu butunning yuzdan bir qismi (1/100 = 0.01) ga teng.`,
    };
  }

  // 4. Powers: e.g. 2^5, 3^4
  const powMatch = q.match(/^(\d+\.?\d*)\s*\^\s*(\d+)$/);
  if (powMatch) {
    const base = parseFloat(powMatch[1]);
    const exp = parseInt(powMatch[2], 10);
    const val = Math.pow(base, exp);
    const expanded = Array(exp).fill(base).join(' × ');
    return {
      success: true,
      category: 'Daraja tushunchasi',
      steps: [
        `1. Berilgan ifoda: ${base}^${exp}`,
        `2. Qoida: a^n daraja n ta a sonining ko'paytmasiga teng.`,
        `3. Yoyilma: ${base}^${exp} = ${expanded}`,
        `4. Hisoblash natijasi: ${val}`,
      ],
      answer: `${base}^${exp} = ${val}`,
      tips: "Har qanday sonning 0-darajasi 1 ga teng (a^0 = 1, a ≠ 0).",
    };
  }

  // 5. Short algebra formula: (a+b)^2, (a-b)^2, (x+y)^2
  const algMatch = q.match(/^\(([a-zA-Z0-9]+)\s*([\+\-])\s*([a-zA-Z0-9]+)\)\s*\^\s*2$/);
  if (algMatch) {
    const term1 = algMatch[1];
    const sign = algMatch[2];
    const term2 = algMatch[3];
    return {
      success: true,
      category: 'Qisqa ko‘paytirish formulalari',
      steps: [
        `1. Berilgan ifoda: (${term1} ${sign} ${term2})²`,
        `2. Qoida: Ikkihad yig'indisi (yoki ayirmasi) ning kvadrati formulasi:`,
        `   (a ± b)² = a² ± 2ab + b²`,
        `3. Formulaga qo'yish:`,
        `   Birinchi hadning kvadrati: (${term1})² = ${term1}²`,
        `   Ikkilangan ko'paytma: 2 × (${term1}) × (${term2}) = 2${term1}${term2}`,
        `   Ikkinchi hadning kvadrati: (${term2})² = ${term2}²`,
        `4. Birlashtirish: ${term1}² ${sign} 2${term1}${term2} + ${term2}²`,
      ],
      answer: `${term1}² ${sign} 2${term1}${term2} + ${term2}²`,
      tips: "Ikki son yig'indisining kvadrati ularning kvadratlari va ikkilangan ko'paytmasi yig'indisiga teng.",
    };
  }

  // 6. Generic arithmetic expressions (safe evaluation)
  const cleanExpr = q.replace(/×/g, '*').replace(/÷/g, '/').replace(/:/g, '/');
  if (/^[0-9\.\+\-\*\/\(\)\s\^]+$/.test(cleanExpr)) {
    try {
      const sanitized = cleanExpr.replace(/\^/g, '**');
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        return {
          success: true,
          category: 'Arifmetik hisoblash',
          steps: [
            `1. Berilgan ifoda: ${q}`,
            `2. Amallar tartibi: Avval qavslar ichi, so'ng darajaga ko'tarish, ko'paytirish va bo'lish, oxirida qo'shish va ayirish amallari bajariladi.`,
            `3. Bosqichma-bosqich hisoblash natijasi: ${result}`,
          ],
          answer: `${result}`,
          tips: "Matematikada amallar ketma-ketligiga doimo qat'iy amal qilinadi.",
        };
      }
    } catch {
      // ignore eval error
    }
  }

  // Default fallback guidance
  return {
    success: true,
    category: '7-sinf matematika masalasi',
    steps: [
      `1. Savol tahlil qilindi: "${q}"`,
      `2. 7-sinf matematika darsligi qoidalari asosida:`,
      `   - Noma'lumlarni aniqlang va berilgan ma'lumotlarni yozib oling.`,
      `   - Mos qoida yoki formulani qo'llang.`,
      `   - Amallarni bosqichma-bosqich bajaring.`,
      `3. Savolni aniqroq kiritish uchun masalan: "2x + 5 = 17" yoki "3/4 + 2/5" yoki "120 ning 20% i" shaklida yozishingiz mumkin.`,
    ],
    answer: `Savol ko'rib chiqildi. Yuqoridagi bosqichlar asosida tekshirib ko'ring.`,
    tips: "Murakkab masalalarni sodda qismlarga bo'lib yechish doim qulay hisoblanadi.",
  };
}

// AI Question solving route
app.post('/api/solve', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string' || !question.trim()) {
      res.status(400).json({
        success: false,
        error: 'Iltimos, matematik savol yoki masalani kiriting.',
      });
      return;
    }

    const trimmedQuestion = question.trim().slice(0, 500);

    // If Gemini client is configured, call Gemini API
    if (ai) {
      try {
        const prompt = `Foydalanuvchi quyidagi matematik savolni berdi: "${trimmedQuestion}".
Ushbu savolni 7-sinf matematika dasturi darajasida aniq, to'g'ri va bosqichma-bosqich o'zbek tilida yeching.
Agar savol matematikaga oid bo'lmasa, muloyim tarzda faqat matematika bo'yicha yordam berishingizni tushuntiring.
Javobni quyidagi JSON formatida qaytaring:
{
  "success": true,
  "category": "Mavzu nomi (masalan: Chiziqli tenglama, Kasrlar, Foiz, Geometriya va h.k.)",
  "steps": [
    "1-qadam tushuntirishi",
    "2-qadam hisoblashi",
    "3-qadam yakunlanishi"
  ],
  "answer": "Yakuniy aniq javob (masalan: x = 6)",
  "tips": "Foydali matematik eslatma yoki qoida"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction:
              "Siz 7-sinf o'quvchilari uchun professional matematika repetitori va yordamchisisiz. Har qanday matematik savol, tenglama, ifoda, masala yoki geometriya topshirig'ini aniq va to'g'ri yechasiz. Tushuntirishlarni oddiy, tushunarli, o'zbek tilida 7-sinf o'quvchisiga mos ravishda bering. Har bir qadamni mantiqiy tartibda yozing. Yakuniy javobni albatta aniq belgilang.",
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                success: { type: Type.BOOLEAN },
                category: { type: Type.STRING },
                steps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                answer: { type: Type.STRING },
                tips: { type: Type.STRING },
              },
              required: ['success', 'category', 'steps', 'answer'],
            },
          },
        });

        const textOutput = response.text?.trim();
        if (textOutput) {
          try {
            const parsed = JSON.parse(textOutput);
            res.json({
              success: true,
              question: trimmedQuestion,
              category: parsed.category || '7-sinf matematika',
              steps: parsed.steps || [],
              answer: parsed.answer || '',
              tips: parsed.tips || undefined,
            });
            return;
          } catch {
            // parsing fallback
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, using local math solver:', geminiError);
      }
    }

    // Fallback: solve using local math engine
    const localResult = solveMathLocally(trimmedQuestion);
    res.json({
      ...localResult,
      question: trimmedQuestion,
    });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({
      success: false,
      error: 'Masalani yechishda kutilmagan xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.',
    });
  }
});

// Vite middleware for dev or static serving for prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Matematika 7-sinf server is running on port ${PORT}`);
  });
}

startServer();
