<template>
  <div class="publish">
    <Header title='发表问题'></Header>
    <br>
    <van-cell-group
      :border='false'>
      <van-field
        label="分类"
        :border='false'
        clearable
        v-model="category.name"
        readonly
        placeholder="请选择"
        @click="show = true"
      />
      <div class="border"></div>
      <van-field
        label="标题"
        clearable
        v-model="title"
        :border='false'
        placeholder="请输入问题的标题"
      />
      <div class="border"></div>
      <van-field
        label="描述"
        type="textarea"
        :border='false'
        clearable
        v-model="desc"
        placeholder="请输入问题的描述"
        rows="4"
        autosize
      />
    </van-cell-group>
    <van-actionsheet
      v-model="show"
      :actions="actions"
      @select='handleSelect'
    />
    <div class="border"></div>
    <a href="javascript;;" class="submit-btn" @click.prevent='handleSubmitClick'>确认发表</a>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Toast } from "vant";

export default {
    data() {
        return {
            category: {
            name: "",
            id: 0
            },
            title: "",
            desc: "",
            show: false,
            actions: []
        };
    },
    components: { Header },
    created() {
        this.$http.get('/data/answer/category') 
            .then(({ data }) => {
                data.data.forEach((item) => {
                    let val = {
                        name: item.cate_name,
                        id: item.cate_id
                    };
                    this.actions.push(val);
                })
            })
    },
  methods: {
    handleSubmitClick() {
        if (!this.category.name) return Toast("请选择问题分类");
        if (!this.title) return Toast("请输入问题标题");
        if (this.title.length < 4 || this.title.length > 30) {
            return Toast("问题标题长度在4-30个字符之间");
        }
        if (!this.desc) return Toast("请输入问题描述");

        let id = this.category.id;
        let title = this.title;
        let desc = this.desc;
        this.$http.post('/data/answer/publish', {
            params: {
                id, title, desc
            }
        })
        .then(({ data }) => {
            if(data.code === 0) {
                this.$router.push(`/answer_detail/${data.data.question_id}`)
            }
        })
    },
    handleSelect(item) {
      this.category = item;
      this.show = false;
    },
  }
};
</script>
<style>
.van-cell-group{
  background-color: transparent;
}
.van-cell{
  background-color: transparent;
}
.van-field .van-cell__title {
  color: rgba(255,255,255,.8);
}
.van-field__control{
  color: rgba(255,255,255,.8);
}
</style>


