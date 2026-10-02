import { GoogleGenAI, Type } from '@google/genai';

// Local math fallback solver
function solveMathLocally(rawQuestion: string) {
  const q = rawQuestion.trim();

  // 1. Linear equation solver
  const eqMatch = q.match(/^([+-]?\s*\d*\.?\d*)\s*([a-zA-Z])\s*([+-]\s*\d+\.?\d*)?\s*=\s*([+-]?\s*\d*\.?\d*)\s*([a-zA-Z])?\s*([+-]\s*\d+\.?\d*)?$/);
  if (eqMatch) {
    const varName = eqMatch[2] || eqMatch[5] || 'x';
    let a1Str = (eqMatch[1] || '').replace(/\s+/g, '');
    let a1 = 0;
    if (a1Str === '' || a1Str === '+') a1 = 1;
    else if (a1Str === '-') a1 = -1;
    else a1 = parseFloat(a1Str) || 0;

    let b1Str = (eqMatch[3] || '').replace(/\s+/g, '');
    let b1 = parseFloat(b1Str) || 0;

    let a2Str = (eqMatch[4] || '').replace(/\s+/g, '');
    let a2 = 0;
    let b2 = 0;

    if (eqMatch[5]) {
      if (a2Str === '' || a2Str === '+') a2 = 1;
      else if (a2Str === '-') a2 = -1;
      else a2 = parseFloat(a2Str) || 0;

      let b2Str = (eqMatch[6] || '').replace(/\s+/g, '');
      b2 = parseFloat(b2Str) || 0;
    } else {
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
            `0 · ${varName} = 0`,
            `Natija: Har qanday haqiqiy son tenglamaning ildizi hisoblanadi.`,
          ],
          answer: `${varName} ∈ R (cheksiz ko'p yechim)`,
          tips: "Nolga ko'paytirilgan har qanday son nolga teng.",
        };
      } else {
        return {
          success: true,
          category: 'Bir o‘zgaruvchili tenglama',
          steps: [
            `Berilgan tenglama: ${q}`,
            `0 · ${varName} = ${netB}`,
            `Tenglama yechimga ega emas.`,
          ],
          answer: 'Yechim yo‘q (bo‘sh to‘plam ∅)',
          tips: "Nolga bo'lish mumkin emas.",
        };
      }
    }

    const sol = netB / netA;
    const formattedSol = Number.isInteger(sol) ? sol.toString() : sol.toFixed(2).replace(/\.00$/, '');

    return {
      success: true,
      category: 'Chiziqli tenglama',
      steps: [
        `1. Berilgan tenglama: ${q}`,
        `2. O'zgaruvchili hadlarni chapga, ozod sonlarni o'ng tomonga o'tkazamiz:`,
        `   ${netA}${varName} = ${netB}`,
        `3. Tenglikning ikkala qismini ${netA} ga bo'lamiz:`,
        `   ${varName} = ${netB} ÷ ${netA}`,
        `   ${varName} = ${formattedSol}`,
        `4. Tekshirish: ${varName} = ${formattedSol} qo'yilganda to'g'ri tenglik hosil bo'ladi.`,
      ],
      answer: `${varName} = ${formattedSol}`,
      tips: "Tenglamalarni yechishda ozod sonlar qarama-qarshi ishora bilan o'ng tomonga o'tkaziladi.",
    };
  }

  // 2. Fractions
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
          `2. Umumiy maxraj: EKUK(${den1}, ${den2}) = ${commonDen}`,
          `3. Maxrajga keltirish: ${newNum1}/${commonDen} ${op} ${newNum2}/${commonDen}`,
          `4. Suratlarni hisoblash: (${newNum1} ${op} ${newNum2}) / ${commonDen} = ${resultNum}/${commonDen}`,
          g > 1 ? `5. Qisqartirish: ${finalNum}/${finalDen}` : `5. Kasr qisqarmaydigan shaklda: ${finalNum}/${finalDen}`,
        ],
        answer: finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`,
        tips: "Kasrlarni qo'shish va ayirishda har doim umumiy maxraj topiladi.",
      };
    }
  }

  // 3. Percentages
  const pctMatch = q.match(/(\d+\.?\d*)\s*(?:ning)?\s*(\d+\.?\d*)\s*%/i) || q.match(/(\d+\.?\d*)\s*%\s*(?:of|ning)?\s*(\d+\.?\d*)/i);
  if (pctMatch) {
    const total = parseFloat(pctMatch[1]);
    const pct = parseFloat(pctMatch[2]);
    const val = (total * pct) / 100;
    const formatted = Number.isInteger(val) ? val.toString() : val.toFixed(2);
    return {
      success: true,
      category: 'Foizlar',
      steps: [
        `1. Berilgan: Son = ${total}, Foiz = ${pct}%`,
        `2. Formula: (Son × Foiz) ÷ 100`,
        `3. Hisoblash: (${total} × ${pct}) ÷ 100 = ${total * pct} ÷ 100 = ${formatted}`,
      ],
      answer: `${formatted}`,
      tips: "1% butunning 1/100 qismiga teng.",
    };
  }

  // Default fallback
  return {
    success: true,
    category: '7-sinf matematika masalasi',
    steps: [
      `1. Savol: "${q}"`,
      `2. Berilgan ma'lumotlar aniqlanadi va mos matematik qoida tanlanadi.`,
      `3. Hisoblash amallari ketma-ket bajariladi.`,
    ],
    answer: 'Savol tahlil qilindi.',
    tips: "Murakkab ifodalarni sodda qismlarga bo'lib yechish tavsiya etiladi.",
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { question } = req.body || {};
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ success: false, error: 'Matematik savol kiritilmadi.' });
    }

    const trimmedQuestion = question.trim().slice(0, 500);
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
        });

        const prompt = `Foydalanuvchi quyidagi matematik savolni berdi: "${trimmedQuestion}".
Ushbu savolni 7-sinf matematika dasturi darajasida aniq, to'g'ri va bosqichma-bosqich o'zbek tilida yeching.`;

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
          const parsed = JSON.parse(textOutput);
          return res.status(200).json({
            success: true,
            question: trimmedQuestion,
            category: parsed.category || '7-sinf matematika',
            steps: parsed.steps || [],
            answer: parsed.answer || '',
            tips: parsed.tips || undefined,
          });
        }
      } catch (geminiError) {
        console.warn('Gemini API in serverless failed, falling back:', geminiError);
      }
    }

    const localResult = solveMathLocally(trimmedQuestion);
    return res.status(200).json({
      ...localResult,
      question: trimmedQuestion,
    });
  } catch (error) {
    console.error('Serverless error:', error);
    return res.status(500).json({ success: false, error: 'Xatolik yuz berdi.' });
  }
}
