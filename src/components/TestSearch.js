import React, { useState, useEffect, Fragment } from "react";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom'
import "regenerator-runtime/runtime";
import "./app.scss";
// import cal from './json/cal.json';

const TestSearch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [term, setTerm] = useState("");
	const [options, setOptions] = useState([]);
	const [emptyLabel, setEmptyLabel] = useState("");
	const [selId, setSelId] = useState("");
	const [selText, setSelText] = useState("");
	const history = useHistory();

	const handleSearch = (query) => {
		console.log("handleSearch...'"+query+"'");
		setIsLoading(true);

		if(query.length < 3) {
			setEmptyLabel("Minimum 3 chars");
			setIsLoading(false);
		} else {
			setEmptyLabel("Not Found");
			var newTerm = query.substring(0,3);
			if (newTerm != term) setTerm(newTerm);

			// mockup cal
			// const options = cal.results.map(i => ({
			  // id: i.id,
			  // text: i.text,
			// }));
			fetch(`https://simpledev.us-west-1.elasticbeanstalk.com/api/contaminants/search?term=${query}`)//
			  .then(resp => resp.json())
			  .then(items => {
				const options = items.results.map(i => ({
				  id: i.id,
				  text: i.text,
				}));

				setOptions(options);
				setIsLoading(false);
			  });

			setOptions(options);
			setIsLoading(false);
		}
	};

	const handleChange = (query) => {
		if(query[0]) {
			if (!(selId) || selId != query[0].id) {
				setSelId(query[0].id);
				setSelText(query[0].text);
			}
		}
	};

	function btnClick() {
		if (selId) {
			// console.log("clicked:"+selId);
			history.push('/TestList/' + selId + "/" + selText);
		}
	}

  return (
	<Fragment>
	   <div className="front-page">
			<div className="main-left">
			  <img className="desktop-only"
				src="./src/components/image/logo-search.ac375448.png"
				style={{
				  height: '297px',
				  marginRight: '10px',
				  width: '315px',
				}}
			  />
			</div>
			<div className="main-right">
				<h1>Get the water test you need</h1>
				<p>Which analytes do you want to test in your water sample?</p>
				<div className="search-box">
					<AsyncTypeahead
					  id="analyte-search"
					  isLoading={isLoading}
					  labelKey="text"
					  minLength={1}
					  onSearch={handleSearch}
					  onChange={handleChange}
					  options={options}
					  placeholder="Type analyte name"
					  emptyLabel={emptyLabel}
					  renderMenuItemChildren={(option, props) => (
						<Fragment>
						  <span>{option.text}</span>
						</Fragment>
					  )}
					/>
					<button className="btn btn-info" onClick={btnClick}>SEARCH</button>
				</div>
			</div>
		</div>
	</Fragment>
  );
};

export default TestSearch;