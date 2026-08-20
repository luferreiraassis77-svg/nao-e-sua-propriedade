import React, { useState } from 'react';
import { Delete, X } from 'lucide-react';

interface CalculatorCamouflageProps {
  onUnlock: () => void;
}

export default function CalculatorCamouflage({ onUnlock }: CalculatorCamouflageProps) {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    // Secret code check: 180 or 190 + = unlocks!
    if (display === '180' || display === '190' || display === '11340') {
      onUnlock();
      return;
    }

    if (prevVal === null) {
      setPrevVal(inputValue);
    } else if (operator) {
      const currentVal = prevVal || 0;
      let result = 0;
      if (operator === '+') result = currentVal + inputValue;
      else if (operator === '-') result = currentVal - inputValue;
      else if (operator === '×') result = currentVal * inputValue;
      else if (operator === '÷') result = inputValue !== 0 ? currentVal / inputValue : 0;
      
      setPrevVal(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto">
      {/* Discreet Header */}
      <div className="flex items-center justify-between py-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-zinc-400">Calculadora</span>
        </div>
        {/* Subtle Unlock Trigger */}
        <button
          onClick={onUnlock}
          className="text-xs text-zinc-600 hover:text-zinc-400 p-2 rounded-lg"
          title="Toque para sair da camuflagem"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screen Display */}
      <div className="my-auto py-8 px-4 text-right">
        <div className="text-zinc-400 text-sm h-6">
          {prevVal !== null && `${prevVal} ${operator || ''}`}
        </div>
        <div className="text-5xl sm:text-6xl font-light tracking-tight truncate">
          {display}
        </div>
      </div>

      {/* Secret Hint */}
      <div className="text-center text-[11px] text-zinc-700 pb-2">
        Dica de segurança: Digite <span className="text-zinc-500 font-bold">180</span> e aperte <span className="text-zinc-500 font-bold">=</span> para voltar ao app.
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-3 pb-6">
        <button
          onClick={clearAll}
          className="h-16 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xl font-bold transition-all active:scale-95"
        >
          AC
        </button>
        <button
          onClick={() => setDisplay(String(parseFloat(display) * -1))}
          className="h-16 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xl font-bold transition-all active:scale-95"
        >
          ±
        </button>
        <button
          onClick={() => setDisplay(String(parseFloat(display) / 100))}
          className="h-16 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xl font-bold transition-all active:scale-95"
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className="h-16 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-2xl font-bold transition-all active:scale-95"
        >
          ÷
        </button>

        {['7', '8', '9'].map((num) => (
          <button
            key={num}
            onClick={() => inputDigit(num)}
            className="h-16 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-2xl font-medium transition-all active:scale-95 border border-zinc-800/60"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => performOperation('×')}
          className="h-16 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-2xl font-bold transition-all active:scale-95"
        >
          ×
        </button>

        {['4', '5', '6'].map((num) => (
          <button
            key={num}
            onClick={() => inputDigit(num)}
            className="h-16 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-2xl font-medium transition-all active:scale-95 border border-zinc-800/60"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => performOperation('-')}
          className="h-16 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-2xl font-bold transition-all active:scale-95"
        >
          -
        </button>

        {['1', '2', '3'].map((num) => (
          <button
            key={num}
            onClick={() => inputDigit(num)}
            className="h-16 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-2xl font-medium transition-all active:scale-95 border border-zinc-800/60"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => performOperation('+')}
          className="h-16 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-2xl font-bold transition-all active:scale-95"
        >
          +
        </button>

        <button
          onClick={() => inputDigit('0')}
          className="h-16 col-span-2 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-2xl font-medium transition-all active:scale-95 border border-zinc-800/60"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="h-16 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-2xl font-medium transition-all active:scale-95 border border-zinc-800/60"
        >
          .
        </button>
        <button
          onClick={() => {
            if (display === '180' || display === '190' || display === '11340') {
              onUnlock();
            } else {
              performOperation('=');
            }
          }}
          className="h-16 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-2xl font-bold transition-all active:scale-95 shadow-md shadow-amber-900/30"
        >
          =
        </button>
      </div>
    </div>
  );
}
