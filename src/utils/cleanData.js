export function cleanNetflixData(raw) { //function to clean all of the data to ensure it displays properly
    return raw.map((d) => { //iterating over every row

        //cleaning genres by splitting by commans and removing empty spaces
        const genres = d.listed_in ? d.listed_in.split(",").map((g) => g.trim()) : [];

        //cleaning countries by splitting by commans and removing empty spaces
        const countries = d.country ? d.country.split(",").map((c) => c.trim()) : ["Unknown"];

        //getting int values from durationMinutes and seasons ONLY
        let durationMinutes = null;
        let seasons = null;

        //cleaning minutes, ex."90 min" => 90
        if (d.type === "Movie" && d.duration) {
            const num = parseInt(d.duration);
            durationMinutes = isNaN(num) ? null : num;
        }

        //cleaning seasons, ex, "2 Seasons" => 2
        else if (d.type === "TV Show" && d.duration) {
            const num = parseInt(d.duration);
            seasons = isNaN(num) ? null : num;
        }

        //cleaning date values
        let dateAdded = null;
        if (d.date_added) {
            const parsed = new Date(d.date_added);
            dateAdded = parsed.toString() === "Invalid Date" ? null : parsed;
        }

        //return the cleaned row
        return {
            ...d,
            director: d.director || "Unknown",
            cast: d.cast || "Unknown",
            rating: d.rating || "Unknown",
            genres,
            countries,
            durationMinutes,
            seasons,
            dateAdded,
        };
    });
}