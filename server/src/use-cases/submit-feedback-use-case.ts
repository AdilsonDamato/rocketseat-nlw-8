import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (comment.trim().length < 10) {
      throw new Error("Comment must be at least 10 characters");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: `Novo feedback do tipo: ${type}`,
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #282828;">`,
        `<div style="width: 100%; text-align: left; margin: 15px 15px 15px 0px; color: #633BBC; font-size: 30px; font-weight: bold;">Feedback - NLW Return</div>`,
        `<p><strong>Tipo do feedback:</strong> ${type}</p>`,
        `<p><strong>Comentário:</strong> ${comment}</p>`,
        screenshot &&
          `<p><strong>Screenshot:</strong></p><img src="${screenshot}" width="100%" style="max-width: 80vw; margin: 0; border: 0; padding: 0; display: block; border: 2px solid #633BBC; border-radius: 15px; padding: 10px;" />`,
        `<div style="font-size: 14px; color: #A1A1AA; width: 100%; text-align: center; margin: 20px;">Feito com ♥ pela Rocketseat</div>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
