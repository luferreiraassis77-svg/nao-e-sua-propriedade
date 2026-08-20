import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy init Gemini SDK
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// AI Assistente Resolve Aí endpoint
app.post("/api/ai/suggest", async (req, res) => {
  const { description } = req.body;
  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "Descrição é obrigatória." });
  }

  // Built-in rule-based analysis as instant reliable fallback
  const descLower = description.toLowerCase();
  let fallbackCategory = "Outro";
  let fallbackPriority: "Normal" | "Alta" | "Urgente" = "Normal";
  let fallbackDepartment = "Secretaria de Serviços Urbanos";
  let fallbackSuggestion = "Ocorrência analisada com base nos termos informados.";

  if (descLower.includes("animal") || descLower.includes("cachorro") || descLower.includes("gato") || descLower.includes("cão") || descLower.includes("cao") || descLower.includes("pet") || descLower.includes("cavalo") || descLower.includes("zoonose") || descLower.includes("castra") || descLower.includes("maus-tratos") || descLower.includes("maus tratos") && (descLower.includes("animal") || descLower.includes("bicho"))) {
    fallbackCategory = "Proteção e Bem-Estar Animal";
    fallbackPriority = descLower.includes("ferido") || descLower.includes("atropela") || descLower.includes("sangue") || descLower.includes("espanca") ? "Urgente" : "Alta";
    fallbackDepartment = "Secretaria do Bem-Estar Animal / CCZ / Polícia Ambiental";
    fallbackSuggestion = "Atendimento prioritário de proteção animal, combate a maus-tratos (Lei Sansão) e resgate de zoonoses.";
  } else if (descLower.includes("idoso") || descLower.includes("idosa") || descLower.includes("terceira idade") || descLower.includes("asilo") || descLower.includes("ilpi") || descLower.includes("violência patrimonial") || descLower.includes("estatuto do idoso")) {
    fallbackCategory = "Proteção e Direitos do Idoso";
    fallbackPriority = descLower.includes("agressão") || descLower.includes("violencia") || descLower.includes("abandono") ? "Urgente" : "Alta";
    fallbackDepartment = "Delegacia de Proteção ao Idoso / CREAS / Conselho do Idoso";
    fallbackSuggestion = "Garantia dos direitos da pessoa idosa, combate à negligência, violência financeira e amparo social.";
  } else if (descLower.includes("mulher") || descLower.includes("violência doméstica") || descLower.includes("violencia") || descLower.includes("agressão") || descLower.includes("maria da penha") || descLower.includes("ameaça")) {
    fallbackCategory = "Proteção à Mulher e Acolhimento SOS";
    fallbackPriority = "Urgente";
    fallbackDepartment = "Secretaria da Mulher / Patrulha Maria da Penha / CRAM";
    fallbackSuggestion = "Atendimento prioritário de proteção e acolhimento à mulher em risco de violência.";
  } else if (descLower.includes("criança") || descLower.includes("crianca") || descLower.includes("menor") || descLower.includes("adolescente") || descLower.includes("jovem") || descLower.includes("trabalho infantil") || descLower.includes("abandono") || descLower.includes("conselho tutelar")) {
    fallbackCategory = "Proteção à Criança e Adolescente";
    fallbackPriority = "Urgente";
    fallbackDepartment = "Conselho Tutelar / Vara da Infância e Juventude / CREAS";
    fallbackSuggestion = "Proteção integral aos direitos da infância e adolescência (ECA) e encaminhamento ao Conselho Tutelar.";
  } else if (descLower.includes("morador de rua") || descLower.includes("situação de rua") || descLower.includes("situacao de rua") || descLower.includes("frio") || descLower.includes("cobertor") || descLower.includes("albergue") || descLower.includes("desabrigado")) {
    fallbackCategory = "Abordagem Social / População em Situação de Rua";
    fallbackPriority = descLower.includes("frio") || descLower.includes("chuva") || descLower.includes("risco") ? "Urgente" : "Alta";
    fallbackDepartment = "Secretaria de Assistência Social (SEAS / Centro POP / Albergue)";
    fallbackSuggestion = "Acionamento de equipe de abordagem social (SEAS) e resgate humanizado.";
  } else if (descLower.includes("cesta") || descLower.includes("fome") || descLower.includes("alimento") || descLower.includes("cras") || descLower.includes("creas") || descLower.includes("cadunico") || descLower.includes("vulnerab")) {
    fallbackCategory = "Assistência Social e Alimentar (CRAS / CREAS)";
    fallbackPriority = "Alta";
    fallbackDepartment = "CRAS / CREAS / Secretaria de Desenvolvimento Social";
    fallbackSuggestion = "Suporte socioassistencial, segurança alimentar e programas de benefício social.";
  } else if (descLower.includes("cadeirante") || descLower.includes("rampa") || descLower.includes("acessibilidade") || descLower.includes("deficiência") || descLower.includes("pcd")) {
    fallbackCategory = "Acessibilidade e Direitos PCD";
    fallbackPriority = "Alta";
    fallbackDepartment = "Secretaria dos Direitos da Pessoa com Deficiência";
    fallbackSuggestion = "Garantia de acessibilidade, mobilidade e respeito aos direitos da pessoa com deficiência.";
  } else if (descLower.includes("buraco") || descLower.includes("asfalto") || descLower.includes("cratera") || descLower.includes("paviment")) {
    fallbackCategory = "Buraco / Asfalto";
    fallbackPriority = descLower.includes("grande") || descLower.includes("acidente") || descLower.includes("cratera") ? "Alta" : "Normal";
    fallbackDepartment = "Secretaria de Obras e Infraestrutura";
    fallbackSuggestion = "Problema relacionado a vias públicas e pavimentação asfáltica.";
  } else if (descLower.includes("poste") || descLower.includes("luz") || descLower.includes("ilumina") || descLower.includes("escuro") || descLower.includes("apagado") || descLower.includes("lâmpada")) {
    fallbackCategory = "Iluminação Pública";
    fallbackPriority = descLower.includes("rua toda") || descLower.includes("perigo") || descLower.includes("assalto") ? "Alta" : "Normal";
    fallbackDepartment = "Departamento de Iluminação Pública (Secretaria de Obras)";
    fallbackSuggestion = "Manutenção de ponto de luz / iluminação pública municipal.";
  } else if (descLower.includes("árvore") || descLower.includes("arvore") || descLower.includes("galho") || descLower.includes("fio") || descLower.includes("queda")) {
    fallbackCategory = "Poda de Árvore / Risco";
    fallbackPriority = descLower.includes("fio") || descLower.includes("cair") || descLower.includes("fiação") || descLower.includes("eletric") ? "Urgente" : "Alta";
    fallbackDepartment = descLower.includes("fio") ? "Defesa Civil & Concessionária de Energia" : "Secretaria de Meio Ambiente e Serviços Públicos";
    fallbackSuggestion = "Intervenção arbórea com potencial risco estrutural ou à rede elétrica.";
  } else if (descLower.includes("vazamento") || descLower.includes("água") || descLower.includes("agua") || descLower.includes("cano") || descLower.includes("hidrômetro")) {
    fallbackCategory = "Água / Vazamento";
    fallbackPriority = descLower.includes("muito") || descLower.includes("alag") || descLower.includes("desperdi") ? "Alta" : "Normal";
    fallbackDepartment = "Companhia de Água e Saneamento";
    fallbackSuggestion = "Vazamento em rede de distribuição de água potável.";
  } else if (descLower.includes("esgoto") || descLower.includes("bueiro") || descLower.includes("mau cheiro") || descLower.includes("fossa")) {
    fallbackCategory = "Esgoto / Saneamento";
    fallbackPriority = descLower.includes("transbord") || descLower.includes("dentro") ? "Alta" : "Normal";
    fallbackDepartment = "Companhia de Saneamento Ambiental";
    fallbackSuggestion = "Desobstrução ou reparo em rede de esgotamento sanitário / galeria pluvial.";
  } else if (descLower.includes("lixo") || descLower.includes("entulho") || descLower.includes("coleta") || descLower.includes("descarte")) {
    fallbackCategory = "Coleta de Lixo / Entulho";
    fallbackPriority = "Normal";
    fallbackDepartment = "Secretaria de Limpeza Urbana e Meio Ambiente";
    fallbackSuggestion = "Remoção de resíduos sólidos ou coleta especial de entulho.";
  } else if (descLower.includes("semáforo") || descLower.includes("semaforo") || descLower.includes("placa") || descLower.includes("sinaliza") || descLower.includes("trânsito") || descLower.includes("transito")) {
    fallbackCategory = "Trânsito / Sinalização";
    fallbackPriority = descLower.includes("semáforo") || descLower.includes("semaforo") ? "Alta" : "Normal";
    fallbackDepartment = "Secretaria Municipal de Trânsito e Mobilidade Urbana";
    fallbackSuggestion = "Sinalização viária e equipamentos de controle de tráfego.";
  }

  try {
    const client = getAIClient();
    if (!client) {
      return res.json({
        category: fallbackCategory,
        priority: fallbackPriority,
        department: fallbackDepartment,
        suggestion: fallbackSuggestion,
        source: "rule-engine"
      });
    }

    const prompt = `Você é o Assistente Inteligente do sistema público cívico "Resolve Aí".
Analise a seguinte descrição de uma solicitação ou problema urbano/social relatado por um morador:
"${description}"

Responda ESTRITAMENTE em formato JSON com os seguintes campos:
- "category": Uma das categorias válidas:
  ["Proteção e Bem-Estar Animal", "Proteção e Direitos do Idoso", "Proteção à Mulher e Acolhimento SOS", "Proteção à Criança e Adolescente", "Abordagem Social / População em Situação de Rua", "Assistência Social e Alimentar (CRAS / CREAS)", "Acessibilidade e Direitos PCD", "Buraco / Asfalto", "Iluminação Pública", "Água / Vazamento", "Coleta de Lixo / Entulho", "Esgoto / Saneamento", "Poda de Árvore / Risco", "Trânsito / Sinalização", "Outro"]
- "priority": Uma das prioridades ["Normal", "Alta", "Urgente"] (Use "Urgente" para violência contra mulher/criança/idoso/animal em risco iminente, risco à vida, frio extremo com desabrigados, acidentes graves ou eletricidade; "Alta" para problemas graves socioassistenciais ou estruturais; "Normal" para manutenções rotineiras).
- "department": O órgão público ou entidade competente (ex: "Secretaria do Bem-Estar Animal / CCZ / Polícia Ambiental", "Delegacia do Idoso / CREAS", "Secretaria da Mulher / Patrulha Maria da Penha", "Conselho Tutelar / Vara da Infância", "Secretaria de Assistência Social (SEAS / Centro POP)", "CRAS / CREAS / Assistência Social", "Secretaria de Obras e Pavimentação", "Departamento de Iluminação Pública", "Companhia de Água e Esgoto", "Secretaria de Meio Ambiente e Defesa Civil", "Secretaria de Trânsito").
- "suggestion": Uma explicação curta e empática (1-2 frases) justificando o encaminhamento e instruindo o cidadão.

Exemplo de saída JSON:
{"category": "Proteção à Mulher e Acolhimento SOS", "priority": "Urgente", "department": "Secretaria da Mulher / Patrulha Maria da Penha / CRAM", "suggestion": "Demanda prioritária de segurança e apoio integral à mulher. Canais de emergência 180 e 153 permanecem acionáveis a qualquer momento."}`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const text = response.text?.trim() || "";
    const parsed = JSON.parse(text);

    return res.json({
      category: parsed.category || fallbackCategory,
      priority: parsed.priority || fallbackPriority,
      department: parsed.department || fallbackDepartment,
      suggestion: parsed.suggestion || fallbackSuggestion,
      source: "gemini-ai"
    });
  } catch (error) {
    console.error("AI Assistant error, returning rule fallback:", error);
    return res.json({
      category: fallbackCategory,
      priority: fallbackPriority,
      department: fallbackDepartment,
      suggestion: fallbackSuggestion,
      source: "rule-engine-fallback"
    });
  }
});

// 24/7 AI WhatsApp Assistant Endpoint (Tira dúvidas, agenda, remarca, cancela e gerencia lembretes)
app.post("/api/ai/whatsapp-assistant", async (req, res) => {
  const { message, history = [], currentAppointments = [] } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Mensagem é obrigatória." });
  }

  const msgLower = message.toLowerCase().trim();
  const protocolMatch = message.match(/AGT-\d{6}/i);
  const foundProtocol = protocolMatch ? protocolMatch[0].toUpperCase() : null;

  // Rule-based parsing helper for fallback / instant response
  let actionType: "none" | "schedule" | "reschedule" | "cancel" | "confirm" | "reminder_send" | "faq" = "faq";
  let updatedAppointment: any = null;
  let newAppointment: any = null;
  let quickActions: Array<{ label: string; action: string; payload?: any }> = [];

  // 1. Identify Intent
  if (
    msgLower.includes("cancelar") || 
    msgLower.includes("cancela") || 
    msgLower.includes("desmarcar") || 
    msgLower.includes("não vou conseguir ir") ||
    msgLower === "3" || 
    msgLower === "3️⃣"
  ) {
    actionType = "cancel";
    const target = foundProtocol 
      ? currentAppointments.find((a: any) => a.protocol.toUpperCase() === foundProtocol) 
      : currentAppointments.find((a: any) => a.status !== "Cancelado");

    if (target) {
      updatedAppointment = {
        ...target,
        status: "Cancelado",
        notes: (target.notes ? target.notes + " | " : "") + "Cancelado via WhatsApp pelo usuário."
      };
    }
  } else if (
    msgLower.includes("remarcar") || 
    msgLower.includes("remarca") || 
    msgLower.includes("mudar data") || 
    msgLower.includes("trocar horário") || 
    msgLower.includes("trocar horario") ||
    msgLower.includes("outro dia") ||
    msgLower === "2" || 
    msgLower === "2️⃣"
  ) {
    actionType = "reschedule";
    const target = foundProtocol 
      ? currentAppointments.find((a: any) => a.protocol.toUpperCase() === foundProtocol) 
      : currentAppointments.find((a: any) => a.status !== "Cancelado");

    if (target) {
      // Pick a future date (e.g. +2 days) or match date in string
      const dateMatch = message.match(/(\d{4}-\d{2}-\d{2})|(\d{1,2}\/\d{1,2})/);
      const timeMatch = message.match(/(\d{1,2}[:h]\d{2})|(\d{1,2}h)/);
      
      const newDate = dateMatch ? (dateMatch[1] || "2026-08-25") : "2026-08-25";
      const newTime = timeMatch ? (timeMatch[0].replace('h', ':').padEnd(5, '0')) : "15:00";

      updatedAppointment = {
        ...target,
        date: newDate.includes('/') ? '2026-08-25' : newDate,
        time: newTime.includes(':') ? (newTime.length === 4 ? '0' + newTime : newTime) : '15:00',
        status: "Remarcado",
        notes: (target.notes ? target.notes + " | " : "") + "Remarcado via assistente WhatsApp."
      };
    }
  } else if (
    msgLower.includes("confirmar") || 
    msgLower.includes("confirmo") || 
    msgLower.includes("vou sim") || 
    msgLower.includes("presença confirmada") ||
    msgLower === "1" || 
    msgLower === "1️⃣"
  ) {
    actionType = "confirm";
    const target = foundProtocol 
      ? currentAppointments.find((a: any) => a.protocol.toUpperCase() === foundProtocol) 
      : currentAppointments.find((a: any) => a.status === "Agendado" || a.status === "Remarcado");

    if (target) {
      updatedAppointment = {
        ...target,
        status: "Confirmado",
        notes: (target.notes ? target.notes + " | " : "") + "Presença confirmada via WhatsApp."
      };
    }
  } else if (
    msgLower.includes("agendar") || 
    msgLower.includes("marcar") || 
    msgLower.includes("quero agendamento") || 
    msgLower.includes("quero uma visita") ||
    msgLower.includes("marcar consulta") ||
    msgLower.includes("marcar castração") ||
    msgLower.includes("marcar vistoria")
  ) {
    actionType = "schedule";
    const randomProtocol = `AGT-${Math.floor(100000 + Math.random() * 900000)}`;
    let service = "Atendimento Geral e Vistoria Cívica";
    let professional = "Central de Atendimento Municipal";

    if (msgLower.includes("castra") || msgLower.includes("animal") || msgLower.includes("pet") || msgLower.includes("veterinári")) {
      service = "Castração & Avaliação Veterinária Gratuita";
      professional = "Centro de Controle de Zoonoses (CCZ)";
    } else if (msgLower.includes("cras") || msgLower.includes("cadunico") || msgLower.includes("bolsa") || msgLower.includes("cesta")) {
      service = "Entrevista do Cadastro Único (CadÚnico / CRAS)";
      professional = "CRAS Central - Atendimento Social";
    } else if (msgLower.includes("luz") || msgLower.includes("poste") || msgLower.includes("eletricista")) {
      service = "Vistoria de Iluminação e Reparo Elétrico";
      professional = "Eletricistas e Iluminação Pública";
    } else if (msgLower.includes("chaveiro") || msgLower.includes("fechadura")) {
      service = "Atendimento de Chaveiro & Reparo";
      professional = "Chaveiro 24h Parceiro do Bairro";
    } else if (msgLower.includes("cano") || msgLower.includes("vazamento") || msgLower.includes("encanador")) {
      service = "Vistoria de Vazamento Hidráulico";
      professional = "Companhia de Saneamento & Encanador";
    }

    newAppointment = {
      id: `apt-${Date.now()}`,
      protocol: randomProtocol,
      clientName: "Cidadão Solicitante",
      clientPhone: "(11) 98765-4321",
      service,
      professionalOrDept: professional,
      date: "2026-08-24",
      time: "10:00",
      address: "Posto Central / Atendimento Domiciliar",
      status: "Confirmado",
      reminder24hSent: false,
      reminder2hSent: false,
      notes: "Agendado via Assistente Virtual de WhatsApp 24h.",
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " ")
    };
  } else if (msgLower.includes("lembrete") || msgLower.includes("lembrar")) {
    actionType = "reminder_send";
  }

  // Generate AI Response using Gemini with WhatsApp Formatting
  try {
    const client = getAIClient();
    if (client) {
      const appointmentsSummary = JSON.stringify(
        currentAppointments.map((a: any) => ({
          protocol: a.protocol,
          client: a.clientName,
          service: a.service,
          date: a.date,
          time: a.time,
          status: a.status,
          address: a.address,
          professional: a.professionalOrDept
        }))
      );

      const prompt = `Você é o "ResolveBot 24h", o assistente virtual de inteligência artificial do sistema cívico e de serviços urbanos "Resolve Aí", operando via WhatsApp oficial.
Sua missão:
1. Tirar dúvidas 24 horas sobre serviços municipais (CRAS, IPTU, coleta de lixo, iluminação, poda de árvore, proteção animal/castração, acolhimento social, combate a violência doméstica, reparos no bairro com chaveiro/eletricista).
2. Agendar novos atendimentos e visitas técnicas.
3. Remarcar compromissos existentes quando solicitado.
4. Cancelar agendamentos com cordialidade e emitir confirmação.
5. Confirmar presença e disparar lembretes.

Regras de Estilo para WhatsApp:
- Use formatação oficial do WhatsApp: *negrito* para termos-chave, datas, horários e protocolos.
- Use emojis amigáveis e organizados (📅, ⏰, 📍, 🔑, ⚡, 🐾, 🤝, ✅, ❌, 🔄).
- Mantenha respostas diretas, ágeis e fáceis de ler no celular (máximo 3 parágrafos curtos).
- Se o usuário estiver interagindo com um compromisso, mencione o protocolo *${foundProtocol || (currentAppointments[0]?.protocol || "AGT-XXXXXX")}*.
- Sempre que pertinente, liste opções numeradas no final (Ex: "Digite *1* para Confirmar, *2* para Remarcar ou *3* para Cancelar").

Contexto dos Agendamentos Atuais na Agenda:
${appointmentsSummary}

Mensagem recebida do usuário:
"${message}"

Responda em formato JSON com a seguinte estrutura:
{
  "replyText": "texto formatado para o WhatsApp com emojis e negrito",
  "actionDetected": "schedule" | "reschedule" | "cancel" | "confirm" | "faq" | "reminder_send",
  "appointmentProtocol": "protocolo envolvido se houver",
  "quickOptions": [
    {"label": "Texto do Botão", "action": "comando"}
  ]
}`;

      const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3
        }
      });

      const text = response.text?.trim() || "";
      const parsed = JSON.parse(text);

      return res.json({
        replyText: parsed.replyText,
        actionDetected: parsed.actionDetected || actionType,
        updatedAppointment: updatedAppointment || (parsed.actionDetected === "cancel" || parsed.actionDetected === "reschedule" || parsed.actionDetected === "confirm" ? updatedAppointment : null),
        newAppointment: newAppointment || (parsed.actionDetected === "schedule" ? newAppointment : null),
        quickOptions: parsed.quickOptions || [
          { label: "📅 Agendar Visita", action: "Quero agendar um atendimento" },
          { label: "🔄 Remarcar Data", action: "Gostaria de remarcar meu agendamento" },
          { label: "❌ Cancelar", action: "Preciso cancelar meu compromisso" },
          { label: "❓ Tirar Dúvida", action: "Como funciona a coleta e iluminação?" }
        ],
        source: "gemini-ai"
      });
    }
  } catch (err) {
    console.error("Gemini WhatsApp Assistant fallback:", err);
  }

  // Robust Rule-based Fallback Response if Gemini is offline
  let replyText = "";
  if (actionType === "cancel") {
    const targetProto = updatedAppointment?.protocol || "AGT-849201";
    replyText = `❌ *Agendamento Cancelado com Sucesso!*\n\nSeu compromisso com protocolo *${targetProto}* foi cancelado em nosso sistema. O horário na agenda foi liberado.\n\nCaso precise marcar uma nova data no futuro, estarei disponível 24 horas por aqui!\n\n_Deseja agendar outro serviço?_`;
    quickActions = [
      { label: "📅 Novo Agendamento", action: "Quero fazer um novo agendamento" },
      { label: "❓ Falar com Atendente", action: "Preciso de ajuda com outro assunto" }
    ];
  } else if (actionType === "reschedule") {
    const targetProto = updatedAppointment?.protocol || "AGT-849201";
    const targetDate = updatedAppointment?.date || "25/08/2026";
    const targetTime = updatedAppointment?.time || "15:00";
    replyText = `🔄 *Agendamento Remarcado com Sucesso!*\n\nAtualizamos sua visita na nossa agenda integrada:\n\n📋 *Protocolo:* ${targetProto}\n📅 *Nova Data:* ${targetDate}\n⏰ *Novo Horário:* ${targetTime}\n📍 *Local:* Posto de Atendimento Municipal / Domiciliar\n\n🔔 Enviaremos um lembrete no seu WhatsApp 24h antes do horário marcado!`;
    quickActions = [
      { label: "✅ Confirmar Presença", action: "Confirmo minha presença" },
      { label: "❌ Cancelar", action: "Cancelar agendamento" }
    ];
  } else if (actionType === "confirm") {
    const targetProto = updatedAppointment?.protocol || "AGT-849201";
    replyText = `✅ *Presença Confirmada!*\n\nExcelente, registramos sua confirmação para o protocolo *${targetProto}* na nossa agenda.\n\n⏰ Nossa equipe / profissional está reservado para o seu horário. Enviaremos um aviso 2 horas antes com o itinerário.\n\nObrigado por utilizar o *Resolve Aí*!`;
    quickActions = [
      { label: "📍 Ver Endereço e Rota", action: "Onde fica o local de atendimento?" },
      { label: "🔄 Preciso Mudar o Horário", action: "Quero remarcar a data" }
    ];
  } else if (actionType === "schedule") {
    const proto = newAppointment?.protocol || "AGT-910243";
    const srv = newAppointment?.service || "Atendimento e Vistoria Cívica";
    replyText = `📅 *Agendamento Confirmado no Resolve Aí!*\n\nSeu atendimento foi sincronizado à agenda com sucesso:\n\n📌 *Serviço:* ${srv}\n📋 *Protocolo:* *${proto}*\n📆 *Data:* 24/08/2026 (Segunda-feira)\n⏰ *Horário:* 10:00\n📍 *Local:* Posto Central Resolve Aí\n\n🔔 O robô de automação enviará lembretes 24h e 2h antes com confirmação em 1 toque!`;
    quickActions = [
      { label: "1️⃣ Confirmar Presença", action: "Confirmar agendamento" },
      { label: "2️⃣ Remarcar Data", action: "Remarcar para outro dia" },
      { label: "3️⃣ Cancelar", action: "Cancelar agendamento" }
    ];
  } else {
    replyText = `👋 Olá! Sou o *Assistente Virtual 24h do Resolve Aí* no WhatsApp.\n\nComo posso te ajudar agora?\n\n1️⃣ *Tirar dúvidas* sobre serviços públicos, documentos e prazos\n2️⃣ *Agendar* consultas, castrações, CRAS e vistorias técnicas\n3️⃣ *Remarcar* ou *Cancelar* um compromisso existente\n4️⃣ *Solicitar reparo* urgente com eletricista, chaveiro ou encanador\n\n_Envie sua mensagem ou toque em uma das opções abaixo:_`;
    quickActions = [
      { label: "📅 Agendar Atendimento", action: "Quero agendar um serviço" },
      { label: "🔄 Remarcar Horário", action: "Quero remarcar meu agendamento" },
      { label: "❌ Cancelar Compromisso", action: "Quero cancelar meu agendamento" },
      { label: "🔑 Chaveiro / Eletricista 24h", action: "Preciso de um profissional de reparo" }
    ];
  }

  return res.json({
    replyText,
    actionDetected: actionType,
    updatedAppointment,
    newAppointment,
    quickOptions: quickActions,
    source: "rule-engine-fallback"
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Resolve Aí server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
