import { toast } from "react-toastify";

const DEFAULT_MESSAGE = "Unexpected error";

enum NotificationType {
	ERROR = "error",
	SUCCESS = "success",
}

interface Parameters {
	type: NotificationType;
}

class Notification {
	public error(message = DEFAULT_MESSAGE): void {
		this.show(message, {
			type: NotificationType.ERROR,
		});
	}
	public success(message = DEFAULT_MESSAGE): void {
		this.show(message, {
			type: NotificationType.SUCCESS,
		});
	}
	private show(message: string, parameters: Parameters): void {
		toast(message, parameters);
	}
}
const notification = new Notification();

export { notification };
