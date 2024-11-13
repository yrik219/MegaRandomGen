import React, { useState } from "react";
import "./index.css";
import logo from "./assets/mg_logoW.png";

function App() {
  const [inputNumbers, setInputNumbers] = useState([]);
  const [savedNumbers, setSavedNumbers] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // Обработка ввода чисел
  const handleInputChange = (e) => {
    const input = e.target.value;
    const parsedNumbers = input
      .split(/[\s,.;:-=+_]+/)
      .map(Number)
      .filter((num) => !isNaN(num));
    setInputNumbers(parsedNumbers);
  };

  // Сохранение чисел в список
  const saveNumbers = () => {
    if (inputNumbers.length > 0) {
      setSavedNumbers(inputNumbers);
      setIsSaved(true);
    }
  };

  // Генерация случайного числа
  const generateRandomNumber = () => {
    if (savedNumbers.length === 0) return;
    const availableNumbers = savedNumbers.filter(
      (num) => !usedNumbers.includes(num)
    );
    const index = Math.floor(Math.random() * availableNumbers.length);
    const selectedNumber = availableNumbers[index];
    setRandomNumber(selectedNumber);
    setUsedNumbers([...usedNumbers, selectedNumber]);
  };

  // Сброс всех данных
  const resetNumbers = () => {
    // setInputNumbers("");
    setInputNumbers([]);
    setSavedNumbers([]);
    setUsedNumbers([]);
    setRandomNumber(null);
    setIsSaved(false);
  };

  return (
    <div className="h-screen bg-gray-900 text-white font-sans min-h-screen">
      <div className="flex flex-col">
        {/* Левая часть: Список сохраненных чисел */}
        <div className="absolute top-0 left-0 w-1/6 bg-gray-900 p-4 overflow-auto h-screen">
          <div className={`${isSaved ? "block" : "hidden"}`}>
            <h2 className="text-lg font-semibold mb-4">Сохраненные числа</h2>
            <ul className="space-y-2">
              {savedNumbers.map((num, index) => (
                <li
                  key={index}
                  className={`${
                    usedNumbers.includes(num)
                      ? "line-through text-gray-500"
                      : ""
                  }`}
                >
                  {num}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Центральная часть: Логотип, сгенерированное число и кнопка "Сгенерировать" */}
        <div className="flex flex-col items-center justify-center space-y-4 h-screen">
          <div className="w-96 h-24">
            <img src={logo} alt="MEGAGEN" className="" />
          </div>
          <div className="text-4xl p-4">{randomNumber ?? "-"}</div>
          <button
            onClick={generateRandomNumber}
            disabled={!isSaved}
            className={`px-4 py-2 rounded transition-colors duration-300 ${
              isSaved
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Сгенерировать
          </button>
        </div>
        {/* Нижняя часть: Поле ввода чисел и кнопки "Сохранить" и "Сбросить" */}
        <div className="flex justify-center items-center bg-gray-900 p-4 mt-auto">
          <textarea
            // value={inputNumbers}
            onChange={handleInputChange}
            disabled={isSaved}
            className="w-full h-32 bg-gray-800 p-2 rounded resize-none border border-gray-600"
            placeholder="Введите числа, разделенные пробелами или знаками"
          />
          <div className="p-2 space-y-2">
            <button
              onClick={saveNumbers}
              disabled={isSaved || inputNumbers.length === 0}
              className={`w-full py-2 px-2 rounded transition-colors duration-300 ${
                isSaved || inputNumbers.length === 0
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Сохранить
            </button>
            <button
              onClick={resetNumbers}
              disabled={!isSaved}
              className={`w-full py-2 px-2 rounded transition-colors duration-300 ${
                isSaved
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
