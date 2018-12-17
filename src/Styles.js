const styles = [
         {
            featureType: 'water',
            stylers: [
              { color: '#4dffff' }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
          },
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#231a1c' } //name of the city
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#3a3735' }, //changed edges of roads along
              { lightness: -40 }
            ]
          },
          {
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#669999' }
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#425466' } // parks
            ]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#565147' }, // roads
              { lightness: 25 }
            ]
          }];

export default styles;
