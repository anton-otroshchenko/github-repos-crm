type WhiteRouteOptions = {
	method: string;
	url: string;
	whiteRoutes: {
		methods: string[];
		path: string;
	}[];
};

const checkIsWhiteRoute = ({
	method,
	url,
	whiteRoutes,
}: WhiteRouteOptions): boolean => {
	const apiUrlRegex = /^\/api\/v\d+(\/.+)$/;
	const match = url.match(apiUrlRegex);
	const [, route] = match ?? [];

	if (!route) {
		return true;
	}

	return whiteRoutes.some(
		({ methods, path }) => path === route && methods.includes(method),
	);
};

export { checkIsWhiteRoute };
