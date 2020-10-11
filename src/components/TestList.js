import React, { useState, useEffect, Fragment } from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom'
import useRequest from "../components/useRequest";
import useSortData from "../components/useSortData";
import "regenerator-runtime/runtime";
import "./app.scss";
// import r226 from './json/226.json';

const TestList = () => {
	const [curSearch, setCurSearch] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);
	const [emptyLabel, setEmptyLabel] = useState("");
	const [searchCont, setSearchCont] = useState([{id: useParams().id, text: useParams().text}]);
	const [itemSearch, setItemSearch] = useState([]);
	const [sortType, setSortType] = useState('price');
	const ref = React.createRef();

	const handleSearch = (query) => {
		setIsLoading(true);

		if(query.length < 3) {
			setEmptyLabel("Minimum 3 chars");
			setIsLoading(false);
		} else {
			setEmptyLabel("Not Found");
			const options = cal.results.map(i => ({
			  id: i.id,
			  text: i.text,
			}));

			setOptions(options);
			setIsLoading(false);
		}
	};

	// updateList();

	const handleChange = (query) => {
		setSearchCont(searchCont.concat({
			  id: query[0].id,
			  text: query[0].text,
			}));

		ref.current.clear();
	};

	function updateList() {
		var ids = searchCont.map(i => (i.id)).toString();
		var url = "https://simpledev.us-west-1.elasticbeanstalk.com/api/variants/search-by-contaminant?ids=["+ids+"]";

		fetch(url)
		  .then(resp => resp.json())
		  .then(items => {
			const itemsSearch = items.data.map(item => ({
			  id: item.id,
			  icon: item.icon_graphic,
			  name: item.variant_name,
			  analytes: item.all_contaminants.length,
			  price: item.testing_price,
			}));

			setItemSearch(itemsSearch);
		  });
		// const itemsSearch = r226.data.map(item => ({
		  // id: item.id,
		  // icon: item.icon_graphic,
		  // name: item.variant_name,
		  // analytes: item.all_contaminants.length,
		  // price: item.testing_price,
		// }));
		// console.log(itemSearch.map(i => (i.price)).toString());

		setItemSearch(itemsSearch);
	}

	useEffect(() => {
		console.log("useEffect");
		var ids = searchCont.map(i => (i.id)).toString();
		var url = "https://simpledev.us-west-1.elasticbeanstalk.com/api/variants/search-by-contaminant?ids=["+ids+"]";

		// const { data, loading, error } = useRequest(url);
		// if (!loading) {
			// console.log(data.result);
			// setItemSearch(itemsSearch);
		// }

		fetch(url)
		  .then(resp => resp.json())
		  .then(items => {
			const itemsSearch = items.data.map(item => ({
			  id: item.id,
			  icon: item.icon_graphic,
			  name: item.variant_name,
			  analytes: item.all_contaminants.length,
			  price: item.testing_price,
			}));

			setItemSearch(itemsSearch);
		  });
		
		// const itemsSearch = r226.data.map(item => ({
		  // id: item.id,
		  // icon: item.icon_graphic,
		  // name: item.variant_name,
		  // analytes: item.all_contaminants.length,
		  // price: item.testing_price,
		// }));
	}, []);

	useEffect(() => {
		// const {items, requestSort, sortConfig } = useSortData(itemSearch);

		// setItemSearch(items);
		const sortArray = type => {
			const types = {
				price: 'price',
				analytes: 'analytes',
			};
			const sortProperty = types[type];
			const sorted = [...itemSearch];
			console.log(sortType);
			console.log(sorted.map(i => (i.price)).toString());
			console.log(sorted.map(i => (i.analytes)).toString());

			sorted.sort((a, b) => b[sortProperty] - a[sortProperty]);
			setItemSearch(sorted);

			console.log(sorted.map(i => (i.price)).toString());
			console.log(sorted.map(i => (i.analytes)).toString());
		};

		sortArray(sortType);
		console.log(itemSearch.map(i => (i.price)).toString());
		console.log(itemSearch.map(i => (i.analytes)).toString());
	}, [sortType]);
  
  return (
	<Fragment>
	<div>
		<div className="list-page">
			<div className="top-page">
				<h1>Get the water test you need</h1>
				<p>Which analytes do you want to test in your water sample?</p>
			</div>
			<div className="content-page">
				<div className="search-column">
					<div className="search-area">
						<div className="current-search-head">
						<b>Show tests with:</b>
						</div>
						{searchCont.map(i =>
							<div className="current-search" id={i.id}>
								<span>{i.text.length>21?i.text.substring(0,21)+'...':i.text}</span>
								<a className="delete"> x</a>
							</div>
						)}
							<AsyncTypeahead className="current-search"
							  id="analyte-search"
							  ref={ref}
							  isLoading={isLoading}
							  labelKey="text"
							  minLength={1}
							  onSearch={handleSearch}
							  onChange={handleChange}
							  options={options}
							  placeholder="Add analyte"
							  emptyLabel={emptyLabel}
							  renderMenuItemChildren={(option, props) => (
								<Fragment>
								  <span>{option.text}</span>
								</Fragment>
							  )}
							/>
						<button className="btn update-list-button" onClick={updateList}>UPDATE LIST</button>
					</div>
				</div>
				<div className="result-column">
					<div className="item-search-header">
						<div className="choose-your-test">Choose your test</div>
						<div className="sort-by">
							<div className="sort-by-item-sort-by">Sort by:</div>
							<div className="sort-by-item-price" onClick={(e) => setSortType("price")}>Price</div>
							<div className="sort-by-item-contaminants" onClick={(e) => setSortType("analytes")}>Total Analytes</div>
							<div className="sort-by-item-contaminants-mobile" onClick={(e) => setSortType("analytes")}>Contaminants</div>
						</div>
					</div>
					{itemSearch.map(i =>
						<div className="recommended-border panel">
							<div className="item-search" id={i.id}>
								<div className="item-col-1">
								  <img className="item-icon"
									src={i.icon}
									style={{
									  marginRight: '10px',
									}}
								  />
								</div>
								<div className="item-col-2">
									<div className="item-title">{i.name}</div>
									<div className="item-total-analytes">
										<span className="flex all-analytes">
										  <img src="/src/components/image/Icon_Lab_Blue.cec9f490.svg"
											style={{
											  height: '20px',
											  marginRight: '5px',
											  width: '20px',
											}}
										  />
										  <span>{i.analytes} Total Analytes</span>
										</span>
										<span>
										  <img src="/src/components/image/Icon_Lab_Blue.cec9f490.svg"
											style={{
											  height: '20px',
											  marginRight: '5px',
											  width: '20px',
											}}
										  />
										  <span>Tap Score Report</span>
										</span>
									</div>
									<div className="item-total-analytes-mobile">
										<span className="mobile-price">{i.price}</span>
										<div className="item-match-search">
											<i className="fa fa-check"></i>
											<div className="analytes-item">
												{searchCont.map(i => <li>{i.text.length>21?
													i.text.substring(0,21)+'...':i.text}</li>
												)}
											</div>
										</div>
										<div className="item-total-all-analytes-mobile">
											+ {i.analytes-1} more
										</div>
									</div>
									<div className="item-description">
										Test for {i.analytes>=100?100:i.analytes>=50?50:i.analytes>=20?20:i.analytes}+ volatile organic compounds that come from a variety of sources.
									</div>
								</div>
								<div className="item-col-3">{i.price}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	</div>
	</Fragment>
  );
};

export default TestList;