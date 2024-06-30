import { DATA_ENDPOINT } from "./constants";

export const fetchData = async () => {
	const response = await fetch(DATA_ENDPOINT);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	const data = await response.json();
	return data;
};
