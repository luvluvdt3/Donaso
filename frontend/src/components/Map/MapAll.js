import React, { Component } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

class MapAll extends Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            lng: 0
        }
    }
    componentDidMount() {
        this.setState({
            lat: this.props.lat,
            lng: this.props.lng
        })
    }
    ChangeMapView = ({ coords }) => {
        const map = useMap();
        map.setView(coords, map.getZoom());
        return null;
    }
    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <MapContainer className="map"
                center={position}
                zoom={15}
                style={{ width: "40vw", height: "50%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=LEwqj633W8lJloJ9ek4z"
                />
                <Circle center={position} pathOptions={fillBlueOptions} radius={200} />
                <this.ChangeMapView coords={position} />
            </MapContainer>
        )
    }
}

export default MapAll