import React from 'react';
import "./moviesTableRow.css";

class MoviesTableRow extends React.Component { //class component
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let{sno,name,genre,rating} = this.props.data;
        return ( //maximum one tag outermost we can return
            <div className="movies-table-row" style={this.props.header ? { fontWeight: "bold" } : {}}>
                <div className = "column serial-number">{sno + "."}</div>
                <div className = "column movie-name">{name}</div>
                <div className = "column genre">{genre}</div>
                <div className = "column rating">{rating}</div>
                

            </div>
        )
    }
}

export default MoviesTableRow;