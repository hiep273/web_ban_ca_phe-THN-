import { Coffee } from "lucide-react";
import { useMemo, useState } from "react";
import { products, quizQuestions } from "../data/customerData.js";

export default function FlavorQuizPage({ navigate, addToCart }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const recommendation = useMemo(() => {
    if (answers.includes("Sáng vị và hương hoa") || answers.includes("Nhẹ nhàng")) {
      return products[1];
    }
    if (answers.includes("Đậm và mộc") || answers.includes("Đậm mạnh")) {
      return products[2];
    }
    return products[0];
  }, [answers]);

  const choose = (answer) => {
    const nextAnswers = [...answers.slice(0, step), answer];
    setAnswers(nextAnswers);
    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    }
  };

  const isDone = answers.length === quizQuestions.length;
  const current = quizQuestions[step];

  return (
    <main className="quiz-page">
      <section className="section-heading centered">
        <p className="eyebrow">Gợi ý theo gu</p>
        <h1>Tìm Gu Cà Phê</h1>
        <p>Trả lời ba câu hỏi để nhận gợi ý cà phê phù hợp với cách bạn uống.</p>
      </section>

      {!isDone ? (
        <section className="quiz-card">
          <div className="progress-row">
            <span>Bước {step + 1} / {quizQuestions.length}</span>
            <span>{Math.round(((step + 1) / quizQuestions.length) * 100)}%</span>
          </div>
          <div className="progress-track">
            <div style={{ width: `${((step + 1) / quizQuestions.length) * 100}%` }} />
          </div>
          <h2>{current.title}</h2>
          <div className="quiz-options">
            {current.options.map((option) => (
              <button key={option} onClick={() => choose(option)}>
                <Coffee size={22} />
                {option}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="result-card">
          <div>
            <p className="eyebrow">Gợi ý phù hợp</p>
            <h2>{recommendation.name}</h2>
            <p>{recommendation.story}</p>
            <div className="chip-row">
              {recommendation.notes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
            <div className="button-row">
              <button className="primary-button" onClick={() => addToCart(recommendation.id)}>
                Thêm gợi ý
              </button>
              <button
                className="secondary-button"
                onClick={() => navigate(`/product/${recommendation.id}`)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
          <img src={recommendation.image} alt={recommendation.name} />
        </section>
      )}
    </main>
  );
}
