import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { 
  SYSTEM_CATEGORIES, 
  IssuePriority, 
  IssueStatus 
} from '../types';
import { 
  MapPin, 
  Camera, 
  AlertCircle, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  Upload, 
  X, 
  Navigation, 
  Building2,
  HelpCircle
} from 'lucide-react';

export default function ReportIssue() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialCategoryParam = searchParams.get('category') || SYSTEM_CATEGORIES[0].name;

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(initialCategoryParam);
  const [department, setDepartment] = useState(
    SYSTEM_CATEGORIES.find(c => c.name === initialCategoryParam)?.defaultDepartment || 'Secretaria de Obras e Infraestrutura'
  );
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [priority, setPriority] = useState<IssuePriority>('Normal');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // AI Assistant States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string;
    priority: IssuePriority;
    department: string;
    suggestion: string;
    source?: string;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [geoLoading, setGeoLoading] = useState(false);

  // Update default department when category changes manually
  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const matched = SYSTEM_CATEGORIES.find(c => c.name === newCat);
    if (matched) {
      setDepartment(matched.defaultDepartment);
    }
  };

  // Generate official protocol format: RA-YYYY-MMDD-XXXX (e.g. RA-2026-0820-0045)
  const generateOfficialProtocol = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const randomSeq = String(Math.floor(1000 + Math.random() * 9000));
    return `RA-${year}-${month}${day}-${randomSeq}`;
  };

  // AI Assistente Resolve Aí
  const handleAnalyzeWithAI = async () => {
    if (!description.trim() || description.length < 5) {
      setError('Escreva ao menos algumas palavras sobre o problema para a IA analisar.');
      return;
    }

    setError('');
    setAiLoading(true);
    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor.');
      }

      const data = await response.json();
      setAiSuggestion(data);

      if (data.category) {
        setCategory(data.category);
      }
      if (data.priority) {
        setPriority(data.priority as IssuePriority);
      }
      if (data.department) {
        setDepartment(data.department);
      }
    } catch (err) {
      console.error('AI Suggestion error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Geolocation GPS capture
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada neste navegador.');
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);

        try {
          // Reverse geocoding via OpenStreetMap Nominatim
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
          if (res.ok) {
            const data = await res.json();
            const road = data.address?.road || '';
            const houseNumber = data.address?.house_number ? `, nº ${data.address.house_number}` : '';
            const suburb = data.address?.suburb || data.address?.neighbourhood || data.address?.city_district || 'Centro';
            const city = data.address?.city || data.address?.town || 'Cidade';
            
            setAddress(road ? `${road}${houseNumber} — ${suburb}, ${city}` : `Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
            setNeighborhood(suburb);
          } else {
            setAddress(`Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
          }
        } catch {
          setAddress(`Localização GPS: Lat ${lat.toFixed(5)}, Long ${lng.toFixed(5)}`);
        } finally {
          setGeoLoading(false);
        }
      },
      (err) => {
        console.warn('Geolocation denied or error:', err);
        setGeoLoading(false);
        alert('Não foi possível obter sua localização automaticamente. Por favor, digite o endereço manualmente.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Handle local photo file upload preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      setPhotoUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login?redirect=/report');
      return;
    }

    if (!description.trim() || !address.trim()) {
      setError('Por favor, preencha o endereço e a descrição do problema.');
      return;
    }

    setSubmitting(true);
    setError('');

    const protocol = generateOfficialProtocol();

    try {
      const initialStatus: IssueStatus = 'Registrado';
      const initialUpdate = {
        status: initialStatus,
        observation: 'Ocorrência registrada no sistema pelo cidadão.',
        updatedBy: user.name,
        date: new Date()
      };

      await addDoc(collection(db, 'ocorrencias'), {
        protocol,
        userId: user.id,
        reporterName: user.name,
        reporterEmail: user.email,
        reporterPhone: user.phone || '',
        category,
        department,
        description: description.trim(),
        address: address.trim(),
        neighborhood: neighborhood.trim() || 'Centro',
        latitude: latitude || null,
        longitude: longitude || null,
        photoUrl: photoPreview || photoUrl || null,
        priority,
        status: initialStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        updates: [initialUpdate],
        aiSuggested: !!aiSuggestion
      });

      // Redirect immediately to protocol tracking screen!
      navigate(`/issue/${protocol}`);
    } catch (err: any) {
      console.error('Error creating occurrence in Firestore:', err);
      setError('Erro ao registrar ocorrência no banco de dados. Tente novamente.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      
      {/* Title & Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
          Registrar Problema na Cidade
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Informe os detalhes da ocorrência para que o órgão responsável seja acionado imediatamente.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 text-xs font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Description & AI Analysis */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-zinc-900">
              1. Descreva o problema encontrado <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-zinc-400">Quanto mais detalhes, melhor</span>
          </div>

          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Exemplo: Existe um buraco grande próximo à esquina da Rua José Silva com risco de quebrar veículos..."
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
          />

          {/* AI Trigger button */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleAnalyzeWithAI}
              disabled={aiLoading || !description.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Analisando com Inteligência Artificial...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Assistente Resolve Aí: Sugerir Categoria e Órgão com IA
                </>
              )}
            </button>

            <span className="text-[11px] text-zinc-400 hidden sm:inline">
              Automação inteligente Gemini
            </span>
          </div>

          {/* AI Suggestion Feedback Box */}
          {aiSuggestion && (
            <div className="mt-4 p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Sugestão do Assistente Resolve Aí:
              </div>
              <p className="text-xs text-blue-900 leading-relaxed italic">
                "{aiSuggestion.suggestion}"
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                <span className="bg-white/80 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">
                  🏷️ Categoria: <strong>{aiSuggestion.category}</strong>
                </span>
                <span className="bg-white/80 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">
                  ⚡ Prioridade: <strong>{aiSuggestion.priority}</strong>
                </span>
                <span className="bg-white/80 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">
                  🏢 Responsável: <strong>{aiSuggestion.department}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Categorization & Department */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-zinc-900">
            2. Categoria e Órgão Responsável
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Categoria da Ocorrência
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <optgroup label="Cuidados com a População, Mulheres e Crianças">
                  {SYSTEM_CATEGORIES.filter(c => c.isSocialProtection).map(c => (
                    <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Serviços Urbanos & Infraestrutura">
                  {SYSTEM_CATEGORIES.filter(c => !c.isSocialProtection).map(c => (
                    <option key={c.id} value={c.name}>{c.icon} {c.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" /> Órgão Público / Setor Responsável
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Social Protection Confidentiality Alert */}
          {SYSTEM_CATEGORIES.find(c => c.name === category)?.isSocialProtection && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-xs space-y-1.5">
              <div className="font-bold flex items-center gap-2 text-rose-800">
                <span>🛡️</span> Protocolo com Tratamento Prioritário & Sigiloso
              </div>
              <p className="leading-relaxed">
                {category === 'Proteção e Bem-Estar Animal' && (
                  <>
                    Esta ocorrência ampara o bem-estar animal sob a <strong>Lei Sansão (Lei nº 14.064/20)</strong>. Para flagrante de maus-tratos ou atropelamento com risco de vida, <strong>ligue 190 (Polícia Ambiental)</strong> ou acione o Centro de Controle de Zoonoses (CCZ).
                  </>
                )}
                {category === 'Proteção e Direitos do Idoso' && (
                  <>
                    Esta ocorrência é protegida pelo <strong>Estatuto do Idoso (Lei nº 10.741)</strong>. Para denúncias anônimas de negligência, agressão ou violência financeira, <strong>ligue Disque 100</strong> ou acione o CREAS.
                  </>
                )}
                {category === 'Proteção à Mulher e Vítimas de Violência' && (
                  <>
                    Esta ocorrência envolve proteção à mulher. Se houver risco iminente ou violência física, <strong>ligue 190 (Polícia Militar)</strong> ou <strong>180 (Central da Mulher)</strong> imediatamente.
                  </>
                )}
                {category === 'Proteção à Criança e Adolescente' && (
                  <>
                    Esta ocorrência é resguardada pelo <strong>ECA (Estatuto da Criança e do Adolescente)</strong> e será encaminhada ao Conselho Tutelar e CREAS. Para urgências, <strong>ligue Disque 100</strong>.
                  </>
                )}
                {category !== 'Proteção e Bem-Estar Animal' && category !== 'Proteção e Direitos do Idoso' && category !== 'Proteção à Mulher e Vítimas de Violência' && category !== 'Proteção à Criança e Adolescente' && (
                  <>
                    Esta ocorrência envolve acolhimento social ou proteção a pessoas em vulnerabilidade. Se for um caso de violência em flagrante, <strong>ligue 190 (Polícia Militar)</strong> ou <strong>180 (Central da Mulher)</strong> imediatamente.
                  </>
                )}
              </p>
            </div>
          )}

          {/* Priority selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-2">
              Nível de Prioridade / Risco
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Normal', 'Alta', 'Urgente'] as IssuePriority[]).map((p) => {
                const isSelected = priority === p;
                let activeClass = 'border-zinc-300 bg-zinc-50 text-zinc-700';
                if (isSelected && p === 'Normal') activeClass = 'border-blue-500 bg-blue-50 text-blue-800 ring-2 ring-blue-200 font-bold';
                if (isSelected && p === 'Alta') activeClass = 'border-orange-500 bg-orange-50 text-orange-800 ring-2 ring-orange-200 font-bold';
                if (isSelected && p === 'Urgente') activeClass = 'border-red-500 bg-red-50 text-red-800 ring-2 ring-red-200 font-bold';

                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-2.5 px-3 rounded-xl border text-xs text-center transition-all cursor-pointer ${activeClass}`}
                  >
                    {p === 'Urgente' ? '🔴 Urgente' : p === 'Alta' ? '🟠 Alta' : '🟢 Normal'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 3: Location / Address */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="block text-sm font-bold text-zinc-900">
              3. Localização e Endereço <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleGetLocation}
              disabled={geoLoading}
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {geoLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Navigation className="w-3.5 h-3.5" />
              )}
              {geoLoading ? 'Obtendo GPS...' : '📍 Usar minha localização atual'}
            </button>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder="Ex: Rua José Silva, nº 100 — Centro"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {latitude && longitude && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Coordenadas GPS fixadas com sucesso: <code>{latitude.toFixed(5)}, {longitude.toFixed(5)}</code></span>
              </div>
            )}
          </div>
        </div>

        {/* Step 4: Photo / Image Upload */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
          <label className="block text-sm font-bold text-zinc-900">
            4. Foto do Problema (Opcional)
          </label>
          
          {photoPreview ? (
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 max-w-sm mx-auto">
              <img src={photoPreview} alt="Foto da ocorrência" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={() => { setPhotoPreview(null); setPhotoUrl(''); }}
                className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-black transition-colors"
                title="Remover foto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="border-2 border-dashed border-zinc-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-zinc-50/50 hover:bg-blue-50/20">
                <Camera className="w-8 h-8 text-zinc-400 mb-2" />
                <span className="text-xs font-bold text-zinc-700">
                  📷 Clique para selecionar ou tirar uma foto
                </span>
                <span className="text-[10px] text-zinc-400 mt-1">
                  Formatos suportados: JPG, PNG, WEBP (Máx: 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <div className="text-center text-xs text-zinc-400 font-medium">— OU INFORME A URL DE UMA IMAGEM —</div>

              <input
                type="url"
                placeholder="https://exemplo.com/foto-buraco.jpg"
                value={photoUrl}
                onChange={(e) => { setPhotoUrl(e.target.value); setPhotoPreview(e.target.value || null); }}
                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}
        </div>

        {/* Submit & Protocol Action Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-300 text-zinc-700 text-sm font-semibold hover:bg-zinc-100 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Gerando Protocolo e Salvando...
              </>
            ) : (
              'ENVIAR OCORRÊNCIA'
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
