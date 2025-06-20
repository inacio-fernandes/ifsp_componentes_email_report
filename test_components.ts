import * as fs from 'fs';
import { ReportGeneratorConcreteInterface } from '@inaciofs/report-generator';
import { EmailService, SMTPConfig, EmailData } from '@lybioit/email-sender-component';

const smtpConfig: SMTPConfig = {
    host: '',
    port: 587,
    user: '',
    pass: ''
};

const component = new ReportGeneratorConcreteInterface();
const reportPort = component.getPort('reportPort');

if (!reportPort) {
  console.error('reportPort não encontrado!');
  process.exit(1);
}

const data = [
  { mes: 'Janeiro', produto: 'Notebook', vendas: 150, regiao: 'Sudeste' },
  { mes: 'Fevereiro', produto: 'Monitor', vendas: 230, regiao: 'Sudeste' }
];

(async () => {
  try {

    const csvBuffer = await reportPort.generateReport(data, 'csv');
    const excelBuffer = await reportPort.generateReport(data, 'excel');


    fs.writeFileSync('relatorio.csv', csvBuffer);
    fs.writeFileSync('relatorio.xlsx', excelBuffer);
    console.log('Relatórios gerados e salvos com sucesso.');

    const service = new EmailService();
    service.configureSMTP(smtpConfig);

    const emailData: EmailData = {
      to: 'destinatario@example.com',
      subject: 'Relatórios CSV e Excel',
      html: '<b>Segue em anexo os relatórios gerados.</b>',
      data: {
        nome: 'John Doe',
        mensagem: 'Esta é uma mensagem automática com os relatórios.',
        link: 'https://example.com'
      },
      attachments: [
        {
          filename: 'relatorio.csv',
          content: csvBuffer
        },
        {
          filename: 'relatorio.xlsx',
          content: excelBuffer
        }
      ]
    };

    await service.sendEmail(emailData, 'base.hbs');
    console.log('Email enviado com sucesso!');

  } catch (error) {
    console.error('Erro no processo:', error);
  }
})();
