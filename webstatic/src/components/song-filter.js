import React from 'react';
import Highlighter from "react-highlight-words";

const removeDiacritics = str => 
    str.normalize('NFKD').replace(/[\u064B-\u065F]/g, '') // https://en.wikipedia.org/wiki/Arabic_(Unicode_block)

const songFilter = (songs, term) => {
    term = removeDiacritics(term.trim())
    if (term.length === 0)
        return songs;
    const regex = RegExp(term, "gi")
    const result = songs.map(song => {
        const score = regex.test(removeDiacritics(song.title)) ? 10 : 0
        const title = <Highlighter
            highlightClassName="bg-info text-white"
            searchWords={[term]}
            textToHighlight={song.title}
        />
        return {
            ...song,
            score,
            title,
        }
    });

    return result.filter(song => song.score>0);
}

export default songFilter