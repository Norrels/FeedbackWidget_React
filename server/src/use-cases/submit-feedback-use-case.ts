import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedback-repository";

interface SubmitFeedbackUseCaseResquest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbackRepository : FeedbacksRepository,
        private mailAdapter : MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseResquest){
        const {type, comment, screenshot } = request;

        if(!type){
            throw new Error('Type is required')
        }

        if(!comment){
            throw new Error('Type is required')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbackRepository.create({
            type, 
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail( {
            subject : 'Novo Feedback',
            body : [
                `<div style="font-family: sans-serif; color: #111;">`,
                `<p>tipo do Feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}"/>` : null,
                `</div>`
                ].join('\n')
        })

        }
    }
