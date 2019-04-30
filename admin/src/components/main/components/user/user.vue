<template>
    <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvatar"/>
      <span class="cs ml10 ft18 mr5">{{username}}</span>
      <Icon type="ios-arrow-down" size="22"></Icon>
      <DropdownMenu slot="list">
       <DropdownItem name="password">变更密码</DropdownItem>
        <DropdownItem name="userInfo">个人信息</DropdownItem>
        <DropdownItem name="logout">安全退出</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Modals title="修改密码" ref="changePwd" :width="664">
      <div slot="content">
        <div class="h50 f6Color mt20f">
          <Icons type="danchuangtishi" size="22" class="ib ml20 mt8"/>
          <span class="ft14 ib ml10">密码变更后,请重新登录</span>
        </div>
        <Form ref="userinfo" :label-width="140" class="mt20" :model="userinfo" :rules="rules">
          <FormItem label="用户名" >
            <Input v-model="username" disabled class="w379x"/>
          </FormItem>
        <!--  <FormItem label="原密码" prop="origin_password">
            <Input v-model="userinfo.origin_password" class="w379x" placeholder="请输入您的新密码"/>
          </FormItem>
        -->
          <FormItem label="新密码" prop="new_password">
            <Input v-model="userinfo.new_password" class="w379x" placeholder="请输入您的新密码"/>
          </FormItem>
          <FormItem label="确认密码" prop="new_password_confirmation">
            <Input v-model="userinfo.new_password_confirmation" class="w379x" placeholder="请确认您的新密码"/>
          </FormItem>
          <FormItem>
            <Button type="primary" class="save w200x ml90" @click="submit">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>

<script>
import Icons from '@/components/icons'
import userAvatar from '@/assets/images/userAvatar.jpg'
import { mapActions } from 'vuex'
import { getUserName } from '@/libs/util'
import { adminResetPassword } from '@/api/user'
import Modals from '@/components/modals'
import './user.less'
export default {
  name: 'User',
  components: { Icons, Modals },
  data () {
    return {
      userAvatar: userAvatar,
      userinfo: {
        // origin_password: '',
        new_password: '',
        new_password_confirmation: ''
      },
      rules: {
        // origin_password: [
        //   {
        //     required: true,
        //     message: '请输入您的原密码',
        //     trigger: 'blur'
        //   }
        // ],
        new_password: [
          {
            required: true,
            message: '请输入您的新密码',
            trigger: 'blur'
          }
        ],
        new_password_confirmation: [
          {
            required: true,
            message: '请确认您的新密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    username () {
      return getUserName()
    }
  },
  methods: {
    ...mapActions(['handleLogOut']),
    logout () {
      this.handleLogOut().then(() => {
        // this.$router.push({
        //   name: "login"
        // });
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.logout()
          break
        case 'message':
          this.message()
          break
        case 'password':
          this.$refs.changePwd.show()
          break
      }
    },
    submit () {
      this.$refs.userinfo.validate(valid => {
        this.$refs.changePwd.spinShow()
        if (valid) {
          adminResetPassword(this.userinfo).then(res => {
            this.$refs.changePwd.spinHide()
            if (res.code === 200) {
              this.$refs.changePwd.hide()
              this.$router.push({ name: 'login' })
            }
          }).catch(error => {
            this.$refs.changePwd.spinHide()
          })
        }
      })
    }
  }
}
</script>
