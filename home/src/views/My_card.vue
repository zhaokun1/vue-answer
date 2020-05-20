<template>
    <div class="page-my-card">
        <Header></Header>
        <h1 class="user-modify-my-card">个人资料</h1>
        <!-- <van-button type="primary">主要按钮</van-button> -->
        <!-- 头像 -->
        <div class="avatar" @change="changeImage($event)">
            <van-uploader
                multiple
                :accept="'image/*'"
                :preview-size="50"
                :deletable="false"
                :after-read="afterRead"
            >
                <span class="current-portrait">当前头像</span>
                <span class="upload-portrait">修改头像</span>
                <img :src="userData.avatar" class="img-upload"/>
                <!-- <van-icon name="arrow" /> -->
            </van-uploader>
        </div>
        <van-cell-group>
        <!-- 昵称 -->
        <van-field
          clearable
          :border='false'
          label="昵称"
          v-model="userData.nickname"
          placeholder="请输入用户名"
        />
        <!-- 手机号 -->
        <van-field
          label="手机号"
          :border='false'
          readonly
          :value='userData.phone'
          icon='question'
          @click-icon="$toast('手机号不可更改')"
        />
        <!-- 性别 -->
        <van-field
          label="性别"
          :border='false'
          v-model="userData.gender"
          readonly
          @click="showSexActionsheet = true"
        />
        <!-- 生日 -->
        <van-field
          label="生日"
          :border='false'
          v-model="userData.birthday"
          readonly
          @click="showBirPopup = true"
          placeholder="请选择"
        />
        <!-- 个人简介 -->
        <van-field
          label="个人简介"
          v-model="userData.bio"
          clearable
          type="textarea"
          placeholder="这家伙什么也没说"
          rows="3"
          autosize
        />
        </van-cell-group>
        <!-- 性别部分 -->
        <mt-actionsheet
            v-model="showSexActionsheet"
            :actions="sexActions"
        />
        <!-- 生日部分 -->
        <van-popup v-model="showBirPopup" position="bottom" :overlay="true">
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :visible-item-count='3'
            @confirm='birPickerConfirm'
            @cancel='showBirPopup = false'
            />
      </van-popup>
      <a class="sumit-btn" @click.prevent='handleModifyClick' href="javascript:;">确认修改</a>
    </div>
</template>
<style lang="scss" scoped>
@import '@/base.scss';
.page-my-card {
    color: #fff;
    .user-modify-my-card {
        position: absolute;
        top: 0%;
        left: 35%;
        text-align: center;
        font-size:14px;
        padding: 10px 20px 15px;
        color: #fff;
    }
    .avatar {
        padding: 10px;
        height: 80px;
        line-height: 80px;
        font-size: 14px;
        border-bottom: 1px solid $bdb;
        .upload-portrait {
            // background-color: green;
            position: relative;
            right: -90%;
            color: #A6A7AA;
        }
        .img-upload {
            width: 60px;
            height: 60px;
            position: relative;
            top: 15px;
            right: -100%;
            border-radius: 50%;
        }  
    }
    
    .sumit-btn {
        margin-top: 100px;
        display: inline-block;
        width: 80%;
        background-color: $bdb;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin-left: 10%;
        font-size: 14px;
    }
    /deep/.van-field__control {
        color: #fff;
    }
    /deep/.van-field {
        color: #fff;
        background-color: $bg;
    }
    
}
</style>
<script>
import Header from '@/components/Header';
import { dateFilter, calRealLength, getLocalStorage } from '@/tools/validator';

export default {
    components: { Header },
    data() {
        return {
            userData: {},
            uploadFile: [],
            showSexActionsheet: false,
            sexActions: [
                { name: '保密', method: this.sexSelect },
                { name: '男', method: this.sexSelect },
                { name: '女', method: this.sexSelect },
            ],
            currentDate: new Date(),
            showBirPopup: false
        }
    },
    methods: {
        getData() {
            let token = this.token;
            this.$http.get('/data/user/information', {
                params: { token }
            })
                .then(({ data }) => {
                    this.userData = data.data
                })
        },
        afterRead(fiels) {
            console.log(fiels)
        },
        // 上传头像
        changeImage(e) {
            let file = e.target.files[0];
            let fr = new FileReader();
            let that = this;
            fr.readAsDataURL(file);
            fr.onload = function () {
	            that.userData.avatar = this.result;
	      };
        },
        // 性别
        sexSelect(item) {
            this.userData.gender = item.name;
            this.showSexActionsheet = false;
        },
        birPickerConfirm(time) {
            this.userData.birthday = dateFilter(time, "YY-MM-DD");
            this.showBirPopup = false;
        },
        handleModifyClick() {
            // 效验
            if (!this.userData.nickname) {
                return this.$toast("请输入昵称");
            }

            let pattern = new RegExp(
                "[`~^*()|{}\\[\\].<>/~#￥……*（）——|{}【】 ‘；：”“']"
            );
            if (pattern.test(this.userData.nickname)) {
                return this.$toast("存在特殊字符");
            }

            let reallength = calRealLength(this.userData.nickname);
            if (reallength < 4 || reallength > 12) {
                return this.$toast("昵称长度必须在4-12个字符之间");
            }
            // 提交
            let user_id = this.userData.user_id;
            let avatar = this.userData.avatar;
            let nickname = this.userData.nickname;
            let gender = this.userData.gender;
            let birthday = this.userData.birthday;
            let bio = this.userData.bio;
            this.$http.post('/data/user/modifyUserCard', {
                params: {
                    user_id, avatar, nickname, gender, birthday, bio 
                }
            })
            .then(({ data }) => {
                if(data.code === 0) {
                    this.getData();
                    this.$toast('修改成功')
                } else {
                    return this.$toast('修改失败')
                }
                
            })


        }
     },
    // 组件创建完成
    created() {
        this.token = getLocalStorage("token", "string");
        this.getData();
    }
}
</script>
