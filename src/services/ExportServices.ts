// service
import APITOKEN from "@/config/http-common"; 
import { type ApiEnrollmentResponse } from "@/interfaces/EnrollmentsInterface";

class ExportServices {
    subscriptionPdf(): Promise<Blob> {
        return APITOKEN.get('/export-pdf', { responseType: 'blob' })
            .then(response => {
                if (response.headers['content-type'] === 'application/pdf') {
                    return response.data;
                } else {
                    throw new Error('A resposta não é um arquivo PDF');
                }
            })
            .catch(error => {
                console.error('Erro ao exportar PDF:', error);
                throw error;
            });
    }
}

export default new ExportServices();
