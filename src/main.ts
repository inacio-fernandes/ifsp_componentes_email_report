import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ReportGeneratorConcreteInterface } from '@inaciofs/report-generator';
import { 
  ConcreteComponentInterface, 
  SMTPConfig, 
  EmailData 
} from '@lybioit/email-sender-component';

// Carregar variáveis de ambiente
dotenv.config();

// Configuração SMTP a partir das variáveis de ambiente
const smtpConfig: SMTPConfig = {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
};

// Verificar se as configurações SMTP estão definidas
if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.pass) {
    console.error('Erro: Configurações SMTP não encontradas no arquivo .env');
    console.error('Por favor, configure as seguintes variáveis:');
    console.error('- SMTP_HOST');
    console.error('- SMTP_PORT');
    console.error('- SMTP_USER');
    console.error('- SMTP_PASS');
    process.exit(1);
}

// 1. Configurar o componente de geração de relatórios
const reportComponent = new ReportGeneratorConcreteInterface();
const reportPort = reportComponent.getPort('reportPort');

if (!reportPort) {
    console.error('Erro: reportPort não encontrado no componente de relatórios!');
    process.exit(1);
}

// 2. Configurar o componente de envio de emails
const emailComponent = new ConcreteComponentInterface();
const emailPort = emailComponent.getPort('emailService'); // Usar getPort com ID específico

if (!emailPort) {
    console.error('Erro: Porta de email não encontrada no componente de email!');
    process.exit(1);
}

// Dados para o relatório
const data = [
    { mes: 'Janeiro', produto: 'Notebook', vendas: 150, regiao: 'Sudeste' },
    { mes: 'Fevereiro', produto: 'Monitor', vendas: 230, regiao: 'Sudeste' },
    { mes: 'Março', produto: 'Mouse', vendas: 89, regiao: 'Sul' },
    { mes: 'Abril', produto: 'Teclado', vendas: 120, regiao: 'Nordeste' }
];

(async () => {
    try {
        console.log('🚀 Iniciando processo de geração de relatórios e envio de email...\n');

        // 3. Gerar relatórios usando o componente de relatórios
        console.log('📊 Gerando relatórios...');
        const csvBuffer = await reportPort.generateReport(data, 'csv');
        const excelBuffer = await reportPort.generateReport(data, 'excel');

        // 4. Salvar relatórios localmente
        const outputDir = path.join(process.cwd(), 'output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const csvPath = path.join(outputDir, 'relatorio.csv');
        const excelPath = path.join(outputDir, 'relatorio.xlsx');
        
        fs.writeFileSync(csvPath, csvBuffer);
        fs.writeFileSync(excelPath, excelBuffer);
        
        console.log('✅ Relatórios gerados e salvos com sucesso:');
        console.log(`   - CSV: ${csvPath}`);
        console.log(`   - Excel: ${excelPath}\n`);

        // 5. Configurar o serviço de email
        console.log('📧 Configurando serviço de email...');
        (emailPort as any).configureSMTP(smtpConfig);

        // 6. Preparar dados do email
        const emailData: EmailData = {
            to: process.env.EMAIL_TO || 'destinatario@example.com',
            subject: 'Relatórios de Vendas - ' + new Date().toLocaleDateString('pt-BR'),
            html: '<b>Segue em anexo os relatórios gerados automaticamente.</b>',
            data: {
                nome: 'Equipe de Vendas',
                mensagem: `Relatórios de vendas gerados automaticamente em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}.`,
                link: 'https://example.com/relatorios',
                totalRegistros: data.length,
                periodo: `${data[0].mes} a ${data[data.length - 1].mes}`
            },
            attachments: [
                {
                    filename: 'relatorio_vendas.csv',
                    content: csvBuffer
                },
                {
                    filename: 'relatorio_vendas.xlsx',
                    content: excelBuffer
                }
            ]
        };

        // 7. Enviar email usando o template
        console.log('📤 Enviando email...');
        const templatePath = path.join(process.cwd(), 'src', 'templates', 'base.hbs');
        await (emailPort as any).send(emailData, templatePath);
        
        console.log('✅ Email enviado com sucesso!');
        console.log(`📬 Destinatário: ${emailData.to}`);
        console.log(`📎 Anexos: ${emailData.attachments?.length || 0} arquivos`);

    } catch (error) {
        console.error('❌ Erro no processo:', error);
        process.exit(1);
    }
})();
