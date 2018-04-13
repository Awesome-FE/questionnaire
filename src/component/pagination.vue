<template>
    <div id="pagination" class="w information_pagination">
        <a href="javascript:;" v-show="page.currentPage != 1" v-on:click="goPage(1)">首页</a>
        <a href="javascript:;" v-show="page.currentPage != 1" v-on:click="goPage(page.currentPage - 1)">上一页</a>
        <span class='page_info'>{{page.currentPage}}/{{page.totalPage}}</span>
        <a href="javascript:;" v-show="page.currentPage != page.totalPage" v-on:click="goPage(page.currentPage + 1)">下一页</a>
        <a href="javascript:;" v-show="page.currentPage != page.totalPage" v-on:click="goPage(page.totalPage)">尾页</a>
    </div>
</template>

<script>
import axios from "axios";
import bus from "../js/eventBus.js";

export default {
  name: "pagination",
  props: ['page', 'url'],
  methods: {
    goPage(pageNum) {
      var vm = this;
      var pageNum = pageNum || 1;
      axios
        .get(vm.url, {
          params: {
            listType: 0,
            pageIndex: pageNum || vm.currentPage,
            pageSize: vm.page.pageSize
          }
        })
        .then(function(resp) {
          var data = resp.data;
          vm.page.totalPage = data.totalPage; //总页数
          vm.page.currentPage = data.pageIndex; //当前页
          vm.$emit('getData', data.data);  // 向父组件传递数据
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.goPage();
  }
};
</script>