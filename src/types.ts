export type IssueStatus = 
  | 'Registrado' 
  | 'Encaminhado' 
  | 'Em análise' 
  | 'Em atendimento' 
  | 'Resolvido';

export type IssuePriority = 'Normal' | 'Alta' | 'Urgente';

export type AppointmentStatus = 'Agendado' | 'Confirmado' | 'Remarcado' | 'Cancelado' | 'Concluído';

export interface Appointment {
  id: string;
  protocol: string;
  clientName: string;
  clientPhone: string;
  service: string;
  category?: string;
  professionalOrDept: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  address: string;
  status: AppointmentStatus;
  reminder24hSent: boolean;
  reminder2hSent: boolean;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  quickActions?: Array<{ label: string; action: string; payload?: any }>;
  appointmentCard?: Partial<Appointment>;
}

export interface WhatsAppReminderRule {
  id: string;
  title: string;
  triggerDescription: string;
  hoursBefore: number;
  enabled: boolean;
  template: string;
}

export interface WhatsAppLog {
  id: string;
  recipientName: string;
  phone: string;
  type: 'Lembrete 24h' | 'Lembrete 2h' | 'Confirmação' | 'Remarcação' | 'Cancelamento' | 'Dúvida Respondida';
  messagePreview: string;
  timestamp: string;
  status: 'Entregue' | 'Lido' | 'Respondido' | 'Confirmado';
}

export const DEFAULT_REMINDER_RULES: WhatsAppReminderRule[] = [
  {
    id: 'rule-confirm',
    title: 'Confirmação Imediata de Agendamento',
    triggerDescription: 'Enviado no momento em que a data/hora é agendada',
    hoursBefore: 0,
    enabled: true,
    template: 'Olá, *{{nome}}*! 📅 Seu agendamento para *{{servico}}* com *{{prestador}}* foi confirmado com sucesso para *{{data}} às {{horario}}*. Local: {{endereco}}. Protocolo: *{{protocolo}}*.'
  },
  {
    id: 'rule-24h',
    title: 'Lembrete com Confirmação (24 Horas Antes)',
    triggerDescription: 'Enviado 24h antes do horário marcado com botões de confirmação',
    hoursBefore: 24,
    enabled: true,
    template: '🔔 *Lembrete Resolve Aí*: Olá {{nome}}, você tem um compromisso amanhã ({{data}} às {{horario}}) para {{servico}}. Por favor, responda *1* para Confirmar, *2* para Remarcar ou *3* para Cancelar.'
  },
  {
    id: 'rule-2h',
    title: 'Alerta de Deslocamento (2 Horas Antes)',
    triggerDescription: 'Enviado 2h antes com orientações de chegada e documentos',
    hoursBefore: 2,
    enabled: true,
    template: '⏰ *Seu atendimento é em 2 horas!* ({{horario}}). Endereço: {{endereco}}. Tenha em mãos documento com foto e comprovante. Em caso de imprevisto, avise por aqui!'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    protocol: 'AGT-849201',
    clientName: 'Mariana Silveira',
    clientPhone: '(11) 98765-4321',
    service: 'Vistoria Técnica de Iluminação e Poste',
    category: 'Iluminação Pública',
    professionalOrDept: 'Secretaria de Obras & Eletricistas Municipais',
    date: '2026-08-21',
    time: '09:30',
    address: 'Rua das Flores, 142 - Centro',
    status: 'Confirmado',
    reminder24hSent: true,
    reminder2hSent: false,
    notes: 'Lâmpada piscando e oscilação na fiação externa.',
    createdAt: '2026-08-19 14:20'
  },
  {
    id: 'apt-2',
    protocol: 'AGT-773190',
    clientName: 'Carlos Eduardo Ramos',
    clientPhone: '(11) 97654-3210',
    service: 'Atendimento do Cadastro Único (CadÚnico)',
    category: 'Assistência Social',
    professionalOrDept: 'CRAS Central - Sala de Triagem 02',
    date: '2026-08-21',
    time: '14:00',
    address: 'Av. Brasil, 850 - Centro Social Urbano',
    status: 'Agendado',
    reminder24hSent: true,
    reminder2hSent: false,
    notes: 'Atualização cadastral para benefício de tarifa social.',
    createdAt: '2026-08-18 10:15'
  },
  {
    id: 'apt-3',
    protocol: 'AGT-621804',
    clientName: 'Juliana Mendes',
    clientPhone: '(11) 96543-2109',
    service: 'Troca de Fechadura & Chaveiro de Segurança',
    category: 'Profissionais do Bairro',
    professionalOrDept: 'Chaveiro & Auto Socorro Express 24h',
    date: '2026-08-22',
    time: '11:00',
    address: 'Rua Bela Cintra, 320, Apto 42',
    status: 'Remarcado',
    reminder24hSent: false,
    reminder2hSent: false,
    notes: 'Remarcado pelo cliente via WhatsApp de sexta para sábado.',
    createdAt: '2026-08-19 16:45'
  },
  {
    id: 'apt-4',
    protocol: 'AGT-519342',
    clientName: 'Roberto Alves',
    clientPhone: '(11) 95432-1098',
    service: 'Avaliação Veterinária & Castração Gratuita',
    category: 'Proteção Animal',
    professionalOrDept: 'Centro de Controle de Zoonoses (CCZ)',
    date: '2026-08-23',
    time: '08:30',
    address: 'Estrada Municipal dos Pinhais, km 4',
    status: 'Agendado',
    reminder24hSent: false,
    reminder2hSent: false,
    notes: 'Gato resgatado de rua em situação vulnerável.',
    createdAt: '2026-08-20 08:00'
  }
];

export interface StatusUpdate {
  status: IssueStatus;
  observation: string;
  updatedBy: string;
  date: any;
}

export interface Issue {
  id?: string;
  protocol: string;
  userId: string;
  reporterName: string;
  reporterEmail?: string;
  reporterPhone?: string;
  category: string;
  department: string;
  description: string;
  address: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  photoUrl?: string | null;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: any;
  updatedAt?: any;
  updates?: StatusUpdate[];
  rating?: number; // 1 to 5 stars
  ratingComment?: string;
  ratingDate?: any;
  aiSuggested?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  createdAt?: any;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  defaultDepartment: string;
  description: string;
  isSocialProtection?: boolean;
}

export interface EmergencyAction {
  id: string;
  title: string;
  number: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
  category: string;
}

export interface NeighborhoodProfessional {
  id: string;
  name: string;
  trade: string; // 'Chaveiro' | 'Eletricista' | 'Encanador' | 'Pedreiro & Reformas' | 'Marido de Aluguel' | 'Mecânico / Guincho' | 'Pintor' | 'Ar-Condicionado / Refrigeração'
  icon: string;
  phone: string;
  whatsapp: string;
  neighborhood: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  is24Hours: boolean;
  isAvailableNow: boolean;
  description: string;
  skills: string[];
  responseTimeMinutes: number;
}

export interface CommunityHelpRequest {
  id: string;
  citizenName: string;
  citizenPhone: string;
  title: string;
  category: string;
  neighborhood: string;
  urgency: 'Normal' | 'Alta' | 'Emergência';
  description: string;
  createdAt: string;
  status: 'Aberto' | 'Em Atendimento' | 'Concluído';
}

export const INITIAL_PROFESSIONALS: NeighborhoodProfessional[] = [
  {
    id: 'prof-1',
    name: 'Chaveiro & Auto Socorro Express 24h',
    trade: 'Chaveiro 24h',
    icon: '🔑',
    phone: '(11) 98765-4321',
    whatsapp: '5511987654321',
    neighborhood: 'Centro & Todos os Bairros',
    rating: 4.9,
    totalReviews: 87,
    isVerified: true,
    is24Hours: true,
    isAvailableNow: true,
    description: 'Abertura de portas residenciais, cofres, cópia de chaves codificadas e abertura de veículos sem danos. Chegada em até 20 minutos.',
    skills: ['Abertura de Portas', 'Chaves Codificadas', 'Fechaduras Digitais', 'Socorro Auto'],
    responseTimeMinutes: 20
  },
  {
    id: 'prof-2',
    name: 'EletroSOS - Eletricista Residencial & Comercial',
    trade: 'Eletricista de Emergência',
    icon: '⚡',
    phone: '(11) 97654-3210',
    whatsapp: '5511976543210',
    neighborhood: 'Jardins / Bela Vista / Centro',
    rating: 4.9,
    totalReviews: 112,
    isVerified: true,
    is24Hours: true,
    isAvailableNow: true,
    description: 'Especialista em pane elétrica, troca de disjuntores, chuveiros, curto-circuito, instalação de tomadas e quadros de luz. Certificado NR10.',
    skills: ['Curto-Circuito', 'Quadro de Luz', 'Troca de Fiação', 'Chuveiro & Disjuntor', 'Padrão Enel'],
    responseTimeMinutes: 25
  },
  {
    id: 'prof-3',
    name: 'HidroReparos & Desentupidora Rápida',
    trade: 'Encanador & Desentupidora',
    icon: '🚰',
    phone: '(11) 96543-2109',
    whatsapp: '5511965432109',
    neighborhood: 'Zona Sul / Pinheiros / Vila Mariana',
    rating: 4.8,
    totalReviews: 64,
    isVerified: true,
    is24Hours: true,
    isAvailableNow: true,
    description: 'Detecção eletrônica de vazamentos, conserto de canos furados, caixa d’água, desentupimento de pias, ralos e vasos sanitários.',
    skills: ['Caça-Vazamentos', 'Troca de Registro', 'Desentupimento', 'Instalação de Torneiras'],
    responseTimeMinutes: 30
  },
  {
    id: 'prof-4',
    name: 'Marido de Aluguel & Manutenções do Bairro',
    trade: 'Marido de Aluguel',
    icon: '🛠️',
    phone: '(11) 95432-1098',
    whatsapp: '5511954321098',
    neighborhood: 'Santana / Zona Norte / Centro',
    rating: 4.9,
    totalReviews: 145,
    isVerified: true,
    is24Hours: false,
    isAvailableNow: true,
    description: 'Pequenos reparos em geral: instalação de varal, cortinas, suportes de TV, montagem e desmontagem de móveis, troca de fechaduras e torneiras.',
    skills: ['Instalação de TV', 'Montagem de Móveis', 'Pequena Pintura', 'Reparos Gerais'],
    responseTimeMinutes: 40
  },
  {
    id: 'prof-5',
    name: 'Socorro Mecânico & Guincho 24h Bairro a Bairro',
    trade: 'Mecânico & Guincho 24h',
    icon: '🚗',
    phone: '(11) 94321-0987',
    whatsapp: '5511943210987',
    neighborhood: 'Todas as Regiões & Vias Expressas',
    rating: 4.7,
    totalReviews: 93,
    isVerified: true,
    is24Hours: true,
    isAvailableNow: true,
    description: 'Chupeta de bateria (carga rápida), troca de pneu furado, falta de combustível (pane seca) e guincho plataforma para carros e motos.',
    skills: ['Recarga de Bateria', 'Troca de Pneu', 'Guincho Plataforma', 'Mecânica Rápida'],
    responseTimeMinutes: 20
  },
  {
    id: 'prof-6',
    name: 'Mestre da Obra - Pedreiro, Azulejista e Pintor',
    trade: 'Pedreiro & Reformas',
    icon: '🧱',
    phone: '(11) 93210-9876',
    whatsapp: '5511932109876',
    neighborhood: 'Zona Leste / Tatuapé / Mooca',
    rating: 4.8,
    totalReviews: 76,
    isVerified: true,
    is24Hours: false,
    isAvailableNow: true,
    description: 'Reformas residenciais, assentamento de pisos e porcelanatos, emboço, reboco, impermeabilização de lajes e pintura completa.',
    skills: ['Porcelanato & Piso', 'Reboco & Alvenaria', 'Impermeabilização', 'Pintura Residencial'],
    responseTimeMinutes: 60
  }
];

export const SYSTEM_CATEGORIES: CategoryInfo[] = [
  // --- Proteção Social, Cuidado & Vulnerabilidade ---
  {
    id: 'saude-mental',
    name: 'Saúde Mental, Depressão e Apoio SOS (CVV 188 / CAPS)',
    icon: '💛',
    defaultDepartment: 'Secretaria Municipal de Saúde / Rede CAPS / CVV 188 / NASF',
    description: 'Acolhimento em crise, apoio emocional na depressão, ideação suicida, ansiedade severa e atendimento psicossocial.',
    isSocialProtection: true
  },
  {
    id: 'protecao-mulher',
    name: 'Proteção à Mulher e Acolhimento SOS',
    icon: '🛡️',
    defaultDepartment: 'Secretaria da Mulher / Patrulha Maria da Penha / CRAM',
    description: 'Acolhimento humanizado, denúncia de violência doméstica, apoio psicológico e jurídico sigiloso.',
    isSocialProtection: true
  },
  {
    id: 'protecao-animal',
    name: 'Proteção e Bem-Estar Animal',
    icon: '🐾',
    defaultDepartment: 'Secretaria do Bem-Estar Animal / CCZ / Polícia Ambiental',
    description: 'Denúncia de maus-tratos, abandono de cães/gatos, animais atropelados/feridos, castração e zoonoses.',
    isSocialProtection: true
  },
  {
    id: 'protecao-idoso',
    name: 'Proteção e Direitos do Idoso',
    icon: '👵',
    defaultDepartment: 'Delegacia de Proteção ao Idoso / Conselho Municipal do Idoso / CREAS',
    description: 'Maus-tratos, violência financeira/patrimonial, abandono, acolhimento em ILPI e Estatuto do Idoso.',
    isSocialProtection: true
  },
  {
    id: 'crianca-adolescente',
    name: 'Proteção à Criança e Adolescente',
    icon: '🧒',
    defaultDepartment: 'Conselho Tutelar / Vara da Infância e Juventude / CREAS',
    description: 'Denúncia de maus-tratos, abuso, trabalho infantil, bullying grave, evasão e vulnerabilidade.',
    isSocialProtection: true
  },
  {
    id: 'populacao-rua',
    name: 'Abordagem Social / População em Situação de Rua',
    icon: '🤝',
    defaultDepartment: 'Secretaria de Assistência Social (SEAS / Centro POP / Albergue)',
    description: 'Solicitar acolhimento imediato, resgate no frio/chuva, cobertores e encaminhamento a abrigos.',
    isSocialProtection: true
  },
  {
    id: 'assistencia-cras',
    name: 'Assistência Social e Alimentar (CRAS / CREAS)',
    icon: '🍲',
    defaultDepartment: 'CRAS / CREAS / Secretaria de Desenvolvimento Social',
    description: 'Cesta básica emergencial, auxílio vulnerabilidade, CadÚnico e aluguel social.',
    isSocialProtection: true
  },
  {
    id: 'acessibilidade-pcd',
    name: 'Acessibilidade e Direitos PCD',
    icon: '🦯',
    defaultDepartment: 'Secretaria dos Direitos da Pessoa com Deficiência',
    description: 'Rampa de acesso obstruída, transporte adaptado municipal e inclusão urbana.',
    isSocialProtection: true
  },
  // --- Serviços Urbanos e Infraestrutura ---
  {
    id: 'buraco',
    name: 'Buraco / Asfalto',
    icon: '🕳️',
    defaultDepartment: 'Secretaria de Obras e Infraestrutura',
    description: 'Crateras, asfalto cedendo, desníveis e pavimentação danificada.'
  },
  {
    id: 'iluminacao',
    name: 'Iluminação Pública',
    icon: '💡',
    defaultDepartment: 'Departamento de Iluminação Pública',
    description: 'Lâmpadas queimadas, postes apagados ou acesos durante o dia.'
  },
  {
    id: 'agua',
    name: 'Água / Vazamento',
    icon: '🚰',
    defaultDepartment: 'Companhia de Água e Saneamento',
    description: 'Vazamento de água limpa na rua, cano estourado ou falta d\'água.'
  },
  {
    id: 'lixo',
    name: 'Coleta de Lixo / Entulho',
    icon: '🗑️',
    defaultDepartment: 'Secretaria de Limpeza Urbana e Meio Ambiente',
    description: 'Acúmulo de entulho, descarte irregular ou atraso na coleta.'
  },
  {
    id: 'esgoto',
    name: 'Esgoto / Saneamento',
    icon: '🚽',
    defaultDepartment: 'Companhia de Saneamento Ambiental',
    description: 'Bueiro entupido, retorno de esgoto ou vazamento a céu aberto.'
  },
  {
    id: 'arvore',
    name: 'Poda de Árvore / Risco',
    icon: '🌳',
    defaultDepartment: 'Secretaria de Meio Ambiente e Defesa Civil',
    description: 'Galhos sobre fiação elétrica, risco de queda ou desobstrução.'
  },
  {
    id: 'transito',
    name: 'Trânsito / Sinalização',
    icon: '🚦',
    defaultDepartment: 'Secretaria Municipal de Trânsito e Mobilidade',
    description: 'Semáforo com defeito, placa danificada ou pintura de faixa apagada.'
  },
  {
    id: 'outro',
    name: 'Outro',
    icon: '➕',
    defaultDepartment: 'Secretaria de Serviços Urbanos e Ouvidoria',
    description: 'Outras solicitações de manutenção e zeladoria urbana.'
  }
];

export interface MentalHealthResource {
  id: string;
  name: string;
  type: 'CVV' | 'SAMU' | 'CAPS' | 'UPA' | 'CHAT' | 'ONG';
  phone?: string;
  chatUrl?: string;
  hours: string;
  isFree: boolean;
  description: string;
  badges: string[];
}

export const EMERGENCY_COMMANDS: EmergencyAction[] = [
  {
    id: 'suicidio-cvv-188',
    title: 'SOS Suicídio & CVV 188 (24h)',
    number: '188',
    description: 'Prevenção ao suicídio, apoio emocional gratuito, sigiloso e acolhedor 24h por dia',
    icon: '💛',
    color: 'bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black',
    badge: 'Ligue 188 Grátis',
    category: 'Prevenção ao Suicídio & Saúde Mental'
  },
  {
    id: 'samu-psic-192',
    title: 'SAMU 192 (Urgência & Tentativa)',
    number: '192',
    description: 'Socorro médico imediato para tentativa em andamento, intoxicação ou crise psiquiátrica grave',
    icon: '🚑',
    color: 'bg-red-600 hover:bg-red-700 text-white',
    badge: 'Urgência Médica',
    category: 'Socorro Imediato'
  },
  {
    id: 'mulher-180',
    title: 'Central da Mulher',
    number: '180',
    description: 'Violência doméstica, orientação sigilosa e rede de acolhimento 24h',
    icon: '🛡️',
    color: 'bg-rose-600 hover:bg-rose-700 text-white',
    badge: 'Ligue 180',
    category: 'Proteção à Mulher'
  },
  {
    id: 'animal-190',
    title: 'Proteção Animal (Maus-Tratos)',
    number: '190',
    description: 'Denúncia de maus-tratos a animais, flagrantes e resgate (Lei Sansão)',
    icon: '🐾',
    color: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    badge: 'Disque Animal',
    category: 'Causa Animal'
  },
  {
    id: 'idoso-100',
    title: 'Proteção ao Idoso',
    number: '100',
    description: 'Violência contra a pessoa idosa, abandono, negligência e violência financeira',
    icon: '👵',
    color: 'bg-purple-700 hover:bg-purple-800 text-white',
    badge: 'Disque 100 Idoso',
    category: 'Direitos do Idoso'
  },
  {
    id: 'crianca-100',
    title: 'Crianças e Adolescentes',
    number: '100',
    description: 'Denúncia de abuso, trabalho infantil, negligência, violência e evasão',
    icon: '🧒',
    color: 'bg-amber-600 hover:bg-amber-700 text-white',
    badge: 'Conselho Tutelar',
    category: 'Crianças e Adolescentes'
  },
  {
    id: 'policia-190',
    title: 'Polícia Militar (Emergência)',
    number: '190',
    description: 'Risco iminente à vida, assaltos, flagrantes e agressões',
    icon: '🚓',
    color: 'bg-blue-700 hover:bg-blue-800 text-white',
    badge: 'Ligue 190',
    category: 'Segurança'
  },
  {
    id: 'samu-192',
    title: 'SAMU (Socorro Médico)',
    number: '192',
    description: 'Acidentes graves, socorro pré-hospitalar e desmaios',
    icon: '🚑',
    color: 'bg-red-600 hover:bg-red-700 text-white',
    badge: 'Ligue 192',
    category: 'Saúde'
  },
  {
    id: 'guarda-153',
    title: 'Guarda Municipal / Patrulha',
    number: '153',
    description: 'Patrulha Maria da Penha, proteção do patrimônio e rondas escolares',
    icon: '👮',
    color: 'bg-indigo-700 hover:bg-indigo-800 text-white',
    badge: 'Ligue 153',
    category: 'Vigilância Municipal'
  },
  {
    id: 'bombeiros-193',
    title: 'Corpo de Bombeiros',
    number: '193',
    description: 'Incêndios, resgates, desabamentos e afogamentos',
    icon: '🚒',
    color: 'bg-orange-600 hover:bg-orange-700 text-white',
    badge: 'Ligue 193',
    category: 'Resgate'
  },
  {
    id: 'defesa-civil-199',
    title: 'Defesa Civil',
    number: '199',
    description: 'Alagamentos, deslizamentos e riscos estruturais de chuva',
    icon: '⛈️',
    color: 'bg-sky-700 hover:bg-sky-800 text-white',
    badge: 'Ligue 199',
    category: 'Defesa Civil'
  },
  {
    id: 'cvv-188',
    title: 'CVV - Apoio Emocional',
    number: '188',
    description: 'Apoio psicológico gratuito, prevenção ao suicídio e acolhimento 24h',
    icon: '💛',
    color: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    badge: 'Ligue 188',
    category: 'Saúde Mental'
  }
];

export const STATUS_STEPS: IssueStatus[] = [
  'Registrado',
  'Encaminhado',
  'Em análise',
  'Em atendimento',
  'Resolvido'
];
