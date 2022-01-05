// write your code here!
d3.queue()
    .defer(d3.json,'./countries.json')
    .defer(d3.csv, './simplemaps-worldcities-basic.csv',
     function(row){
        if(+row.pop < 1000) return;
        return{
            cityName: row.city,
            countryCode: row.iso2,
            population:+row.pop
        }
    }).await(function(error,countries,cities){
        if(error) throw error;

        var data = countries.geonames.map(country => {
            country.cities = cities.filter(city => city.countryCode === country.countryCode);
            return country;
        })
        var countrySelection = d3.select('body')
                                .selectAll('div')
                                .data(data)
                                .enter()
                                .append('div');

    countrySelection.append('h3')
                    .text(d=>d.countryName)
    
    countrySelection.append('url')
                    .html(d=> d.cities.map(city=> {
                    var percentage = city.population / d.population * 100;
                            return `<li> ${city.cityName } - ${percentage.toFixed(2)}%`

                    }).join(''));
                        

    })



// d3.json('./countries.json', function(error, data){
// if(error) throw error;

// console.log(data.geonames);

// d3.select('body')
//     .selectAll('h1')
//     .data(data.geonames)
//     .enter()
//     .append('h1')
//     .text(d=>d.countryName);
// })


//csv('url', function(row,index,headera))
// d3.csv(function(error, data){
//     if(error) return error;

//     console.log(data);
//     })

