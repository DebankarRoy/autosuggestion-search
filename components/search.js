"use client";
import { useState, useEffect } from "react";
import { fetchData } from "@/utils/fetch.js";

const Search = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [data, setData] = useState({
		titles: [],
		queries: [],
		authors: [],
		summaries: [],
	});
	const [cards, setCards] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const jsonData = await fetchData();
			setData(jsonData);
		};

		getData();
	}, []);

	const handleChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		const tempResults = [];
		if (value.length !== 0) {
			data.summaries.forEach((item) => {
				if (item.summary.toLowerCase().includes(value.toLowerCase())) {
					tempResults.push({
						id: item.id,
						title: data.titles[item.id],
						summary: item.summary,
					});
				}
			});
			setResults(tempResults);
		} else {
			setResults([]);
		}
	};

	const handleItemClick = (item) => {
		const bookDetails = findBookDetails(item);
		const newCard = {
			title: bookDetails.title || "Title not available",
			summary: bookDetails.summary || "Summary not available",
			author: bookDetails.author || "Author not available",
		};
		setCards([...cards, newCard]);
		setQuery("");
		setResults([]);
	};

	const findBookDetails = (result) => {
		let tempObj = { ...result };
		data.authors.forEach((author) => {
			if (author.book_id === result.id) {
				tempObj.author = author.author;
			}
		});
		return tempObj;
	};

	return (
		<div className="search-container p-4">
			<input
				type="text"
				value={query}
				onChange={handleChange}
				placeholder="Search..."
				className=""
			/>
			{results.length > 0 && (
				<ul className="suggestion-list">
					{results.map((result) => (
						<li key={result.id} onClick={() => handleItemClick(result)}>
							{result.title}
						</li>
					))}
				</ul>
			)}
			<div className="card-container">
				{cards.map((card, index) => (
					<div key={index} className="card">
						<h3>{card.title}</h3>
						<p>{card.summary}</p>
						<p>Author: {card.author}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Search;
