class AuthController {
	authService;
	constructor(authService) {
		this.authService = authService;
	}
	async signIn(request, reply) {
		try {
			const result = await this.authService.signIn(request.body);
			reply.send(result);
		} catch (error) {
			reply.status(401).send({ message: error.message });
		}
	}
	async signUp(request, reply) {
		try {
			const result = await this.authService.signUp(request.body);
			reply.send(result);
		} catch (error) {
			reply.status(400).send({ message: error.message });
		}
	}
	async getAuthenticatedUser(request, reply) {
		try {
			const userId = request.user?.id; // assuming user is attached by auth middleware
			const result = await this.authService.getAuthenticatedUser(userId);
			reply.send(result);
		} catch (error) {
			reply.status(404).send({ message: error.message });
		}
	}
}
export { AuthController };
