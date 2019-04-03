import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MapContainer } from './modules/';

const API_KEY = 'AIzaSyCjfqMy3vbRNTNMxUl022jWBvf6alE1Bg4';

const App = () =>  {
	const [ map, setMap ] = useState(null);
	
	useEffect(() => {
		
		if (!window.google) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.google.com/maps/api/js?key=${API_KEY}&libraries=places`;
            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                onScriptLoad();
            });
        } else {
        	onScriptLoad();
        }
	}, []);
	
	const onScriptLoad = () => {
		const options={
			center: { lat: 52.527784, lng: 13.403117000000066 },
			zoom: 6
		};
        const mapObj = new window.google.maps.Map(
            document.getElementById('mapComponent'), 
            options
        );
        setMap(mapObj);
	}
	
	return (
		<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
		</header>
		<main>
			<div className="container-fluid">
				<div className="row">
					<div className="map-wrapper col col-xs-12 col-sm-6">
						<div className="mapComponent" id="mapComponent" />
					</div>
					{(map !== null) && <MapContainer map={map} />}
				</div>
			</div>
		</main>
	</div>
	);
}

export default App;

