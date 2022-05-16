import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} }
)

describe('Submit feedback', () => {
    it('Should be able to send a feedback', async () => {
         await expect(submitFeedback.execute({
            type: 'BUG',
            comment : 'Tudo bugado',
            screenshot: 'data:image/png;base64,112'
        })).resolves.not.toThrow();
    });

    it('Should not be able to send a feedback without a type', async () => {
        await expect(submitFeedback.execute({
           type: '',
           comment : 'Tudo bugado',
           screenshot: 'data:image/png;base64,112',
       })).rejects.toThrow();
   });

   it('Should not be able to send a feedback without a type', async () => {
    await expect(submitFeedback.execute({
       type: 'fff',
       comment : '',
       screenshot: 'data:image/png;base64,112',
   })).rejects.toThrow();
});

   it('Should not be able to send a feedback with a invalid screenshot', async () => {
    await expect(submitFeedback.execute({
       type: 'ff',
       comment : 'fff',
       screenshot: '111'
   })).rejects.toThrow();
});
});