const formatDate = (timestamp: number): number => {
	return Math.floor(new Date(timestamp).getTime() / 1000);
};

export { formatDate };
