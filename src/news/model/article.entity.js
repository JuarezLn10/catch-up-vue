import {Source} from "./source.entity.js";

export class Article {
    constructor({
        title = '',
        author = '',
        description = '',
        url = '',
        urlToImage = '',
        source = null,
        publishedAt = ''}) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.source = source ? new Source(source) : null;
        this.publishedAt = new Date(publishedAt);
    }

    getFormattedPublishedAt() {
        return this.publishedAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getFullFormattedPublishedAt() {
        let dateAsString = this.publishedAt.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        let timeAsString = this.publishedAt.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }
}