export class HttpError extends Error {
	public status: number;

	constructor({ status, message }: { status: number; message: string }) {
		super(message);
		this.status = status;
	}
}
