import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  protocol: string;
}

export default function RatingModal({ isOpen, onClose, onSubmit, protocol }: RatingModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(rating, comment);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar avaliação.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-zinc-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-zinc-900">Avaliar Atendimento</h3>
            <p className="text-xs text-zinc-500">Protocolo: {protocol}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center py-2">
            <p className="text-sm font-medium text-zinc-700 mb-2">Como você avalia a resolução do problema?</p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star 
                      className={`w-8 h-8 ${isFilled ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`} 
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-amber-600 font-semibold mt-1 block">
              {rating === 5 && '⭐ Excelente! Problema totalmente resolvido'}
              {rating === 4 && '⭐ Muito Bom'}
              {rating === 3 && '⭐ Regular / Atendeu'}
              {rating === 2 && '⭐ Ruim / Demorou ou ficou incompleto'}
              {rating === 1 && '⭐ Péssimo / Não resolveu satisfatoriamente'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Comentário ou observação (opcional)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte como foi o atendimento da prefeitura/órgão responsável..."
              className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-zinc-600 font-medium hover:bg-zinc-100 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-sm disabled:opacity-50"
            >
              {submitting ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
