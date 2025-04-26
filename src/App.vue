<script>
  import {NewsApiService} from "./news/services/news-api.service.js";
  import {ArticleAssembler as ArticleAssembler} from "./news/services/article.assembler.js";
  import {SourceAssembler as SourceAssembler} from "./news/services/source.assembler.js";
  import SourceList from "./news/components/source-list.component.vue";
  import LanguageSwitcher from "./public/language-switcher.component.vue";
  import UnavailableContent from "./news/components/unavailable-content.component.vue";
  import ArticleList from "./news/components/article-list.component.vue";
  import FooterContent from "./public/footer-content.component.vue";

  export default {
    name: 'App',
    components: {FooterContent, ArticleList, UnavailableContent, LanguageSwitcher, SourceList},
    data() {
      return {
        drawerVisible: false,
        articles: [],
        sources: [],
        errors: [],
        newsApi: new NewsApiService(),
      }
    },
    methods: {
      getArticlesForSourceWithLogo(source) {
        this.newsApi.getArticlesForSourceId(source.id)
            .then((response) => {
              console.log(response);
              this.articles = ArticleAssembler.withSource(source).toEntitiesFromResponse(response);
              console.log(this.articles);
              return this.articles;
            })
            .catch((error) => {
              this.errors.push(error); this.articles = [];
            })
      },
      toggleSidebar() {
        this.drawerVisible = !this.drawerVisible;
      },
      setSource(source) {
        this.getArticlesForSourceWithLogo(source);
        this.toggleSidebar();
      },
      getSources() {
        this.newsApi.getSources()
            .then((response) => {
              console.log(response);
              this.sources = SourceAssembler.toEntitiesFromResponse(response);
              this.getArticlesForSourceWithLogo(this.sources[0]);
            })
            .catch((error) => { this.errors.push(error); this.sources = [];});
      }
    },
    created() {
      this.getSources();
    }
  }
</script>

<template>
  <div>
    <div>
      <pv-menubar>
        <template #start>
          <pv-button icon="pi pi-bards" label="=CatchUp" text @click="toggleSidebar"/>
          <source-list :visible="drawerVisible" :sources="sources" @source-selected="setSource"/>
        </template>
        <template #end>
          <language-switcher/>
        </template>
      </pv-menubar>
    </div>
  </div>
  <div>
    <article-list :articles="articles" v-if="errors"></article-list>
    <unavailable-content v-else :errors="errors"></unavailable-content>
  </div>
  <footer-content/>
</template>