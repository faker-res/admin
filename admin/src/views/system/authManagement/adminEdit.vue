<template>
  <div>
    <Form :model="formKey" ref="formKey" :rules="rules" :label-width="120">
      <FormItem label="创建人">
        <Input class="w320x" v-model="username" disabled/>
      </FormItem>
      <FormItem label="管理员账号" prop="userName">
        <Input v-model="formKey.userName" class="w320x" placeholder="请输入6-20位数字或字母"/>
      </FormItem>
      <FormItem label="管理员密码" prop="password" v-if="!$route.query.id">
        <Input v-model="formKey.password" class="w320x" placeholder="请输入8-20位数字或字母"/>
      </FormItem>
      <FormItem label="管理员别称" prop="otherName">
        <Input v-model="formKey.otherName" class="w320x" placeholder="请输入管理员别称"/>
      </FormItem>
      <FormItem label="管理站点">
        <SiteSelect
          class="ib"
          ref="SiteSelect"
          width="320"
          mode="多选"
          :clearable="false"
          :siteList="accessSite || []"
          @on-site-change="onSiteChange"
        />
        <Button class="oldColor w120x ib ml20" @click="changeCurrentBtn">编辑权限</Button>
      </FormItem>
      <FormItem label="出入款操作等级" v-if="formKey.levelId">
        <LevelSelect
          v-show="false"
          ref="LevelSelect"
          mode="多选"
          levelType="member"
          @on-change="onLevelChange"
        />
        <div v-for="permission in levelPermission" :key="permission.siteId">
          <div v-if="permission.levels.length">
            <span class="ib w70x">{{permission.siteName}}</span>
            <Checkbox
              v-model="permission.checked"
              :indeterminate="permission.indeterminate"
              @on-change="val => checkAll(permission,val)"
            >全选</Checkbox>
            <div class="ib">
              <Checkbox
              v-for="t in permission.levels.slice(0,12)"
              :value="t.levelLabel"
              :key="t.id"
              v-model="t.checked"
              @on-change="val => checkOne(permission,t,val)"
            >{{t.levelName}}</Checkbox>
            </div>
            <div class="ml70">
              <Checkbox
              v-for="t in permission.levels.slice(12,permission.levels.length)"
              :value="t.levelLabel"
              :key="t.id"
              v-model="t.checked"
              @on-change="val => checkOne(permission,t,val)"
            >{{t.levelName}}</Checkbox>
          </div>
            </div>
        </div>
      </FormItem>
      <FormItem label="最大加款">
        <Input class="w320x" v-model="formKey.maxAddMoney" placeholder="0或空表示无上限"/>
      </FormItem>
      <FormItem label="状态" v-if="$route.params.page == 'edit'">
        <Select v-model="formKey.status" class="w320x">
          <Option value="yes">正常</Option>
          <Option value="no">停用</Option>
        </Select>
      </FormItem>
      <FormItem class='origin'>
        <Button
          @click="saveAll"
        >{{$route.params.page == 'edit' ? '确认保存' : '确认添加'}}</Button>
      </FormItem>
    </Form>
    <!-- 编辑权限弹框 -->
    <Modals title="编辑权限" width="1000" ref="editPermission">
      <div slot="content">
        <ButtonGroup style="margin:auto;">
          <Button
            v-for="(t,i) in currentPermission"
            :key="i"
            :class="currentBtn == t.menu_name ? 'bd-bg w135x' : 'bg-or w135x'"
            @click="changeCurrent(t.menu_name)"
          >{{t.menu_name}}</Button>
        </ButtonGroup>
        <div>
          <div
            v-for="(t,i) in currentPermission"
            v-if="t.menu_name == currentBtn"
            :key="i"
            class="clearfix"
          >
            <div v-for="(item,index) in t.newList" :key="'in'+index" class="pre">
              <Checkbox v-model="item.checked" :label="item.name" class="ml10">
                <span>{{item.value}}</span>
              </Checkbox>
            </div>
          </div>
        </div>
        <Button class="tijiao" @click="savePremission">提交保存</Button>
      </div>
    </Modals>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import LevelSelect from '@/components/level-select'
import SiteSelect from '_c/site-select'
import Modals from '_c/modals'
import { getMemberLevelData } from '@/api/member'
import { adminNewDetail, adminNewAdd, adminNewUpdate } from '@/api/system'
import { getUserName } from '@/libs/util'
export default {
  name: 'adminEdit',
  computed: {
    username () {
      return getUserName()
    },
    ...mapState({
      accessSite: state => state.user.accessSite,
      authMenu: state => state.user.authMenu
    })
  },
  components: {
    Modals,
    SiteSelect,
    LevelSelect
  },
  data () {
    return {
      postData: {
        menu: []
      },
      exitAuthMenu: [], // 编辑时的权限
      showPermission: [],
      currentBtn: '会员管理',
      menuName: '',
      currentPermission: [], // 总的权限
      formKey: {
        userName: '',
        password: '',
        otherName: '',
        siteId: [],
        levelId: [],
        maxAddMoney: '0',
        status: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入管理员账号',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            message: '请输入6-20位数字字母',
            pattern: /^[A-Za-z0-9]{6,20}$/
          }
        ],
        password: [
          {
            required: true,
            message: "请输入管理员密码",
            trigger: "blur"
          },
          {
            required: true,
            message: '请输入8-20位数字字母',
            pattern: /^[A-Za-z0-9]{8,20}$/
          }
        ],
        otherName: [
          {
            required: true,
            message: '请输入管理员别称',
            trigger: 'blur'
          }
        ]
      },
      levelPermission: [] // 出入款等级
    }
  },
  created () {
    this.$nextTick(() => {
      // 得到的是能够编辑的所有权限
      this.currentPermission = JSON.parse(this.authMenu)
      this.currentPermission.forEach(item => {
        item.newList = []
        for (let key in item.list) {
          item.newList.push({
            name: key,
            value: item.list[key],
            checked: false
          })
        }
      })
      if (this.$route.query.id) {
        adminNewDetail({ adminId: this.$route.query.id }).then(res => {
          let { siteId, levelId, maxAddMoney, authMenu, status, userName, password, otherName } = res.data
          if (res.data.authMenu) {
            this.exitAuthMenu = JSON.parse(res.data.authMenu)
            this.currentPermission.forEach(item => {
              item.newList.forEach(child => {
                this.exitAuthMenu.forEach(inline => {
                  for (let key in inline.list) {
                    if (key == child.name) {
                      child.checked = true
                    }
                  }
                })
              })
            })
          } else {
            this.exitAuthMenu = []
          }
          siteId = siteId.split(',')
          this.formKey.levelId = levelId.split(',')
          this.formKey.userName = userName
          // this.formKey.password = '12345678'
          this.formKey.otherName = otherName
          this.formKey.maxAddMoney = maxAddMoney
          this.formKey.id = res.data.id
          this.formKey.status = status
          this.$refs.SiteSelect.setDefaultSite(siteId)
        })
      }
    })
  },
  methods: {
    createData () {
      let idList = []
      this.levelPermission.forEach(item => {
        item.levels.forEach(level => {
          if (level.checked) {
            idList.push(level.id)
          }
        })
      })
      let _idList = []
      _idList.forEach(id => {
        if (!_idList.includes(id)) {
          _idList.push(id)
        }
      })
      this.formKey.levelId = _idList
    },
    checkAll (parent, val) {
      this.$set(parent, 'indeterminate', false)
      this.$set(parent, 'checked', val)
      parent.levels.forEach(level => {
        this.$set(level, 'checked', val)
      })
      this.createData()
    },
    checkOne (parent, le, val) {
      this.$set(le, 'checked', val)
      let count = 0
      parent.levels.forEach(level => {
        if (level.checked) count++
      })
      if (count) {
        if (count < parent.levels.length) {
          this.$set(parent, 'checked', false)
          this.$set(parent, 'indeterminate', true)
        } else {
          this.$set(parent, 'checked', true)
          this.$set(parent, 'indeterminate', false)
        }
      } else {
        this.$set(parent, 'checked', false)
        this.$set(parent, 'indeterminate', false)
      }
      this.createData()
    },
    onSiteChange (res) {
      const { id, siteName } = res
      if (id) {
        //  添加
        if (!this.$route.query.id) {
          const { siteId } = this.formKey
          if (id.length > siteId.length) {
            let obj = {}
            obj.siteId = id[id.length - 1]
            obj.siteName = siteName[siteName.length - 1]
            obj.levels = []
            this.$refs.LevelSelect.init(obj.siteId).then(res => {
              obj.levels = res
            })
            this.levelPermission.push(obj)
          } else if (id.length < siteId.length) {
            let excludeId
            siteId.forEach(sid => {
              id.forEach(item => {
                if (sid != item && !id.includes(sid)) {
                  excludeId = sid
                }
              })
            })
            this.levelPermission.forEach((item, i) => {
              if (item.siteId == excludeId) {
                this.levelPermission.splice(i, 1)
              }
            })
          }
          this.formKey.siteId = id
        }
        if (this.$route.query.id) {
          this.levelPermission = []
          // 经历两次change，后台脏数据
          const len1 = this.formKey.siteId.length
          const len2 = id.length
          this.formKey.siteId = id
          if (len1 === len2) return
          const waitFor = (item, i) => {
            return new Promise(resolve => {
              let obj = {}
              obj.siteId = item
              obj.siteName = siteName[i]
              obj.levels = []
              this.$refs.LevelSelect.init(item).then(res => {
                obj.levels = res
                this.levelPermission.push(obj)
                // 编辑check同步
                this.levelPermission.forEach(parent => {
                  let count = 0
                  parent.levels.forEach(level => {
                    this.formKey.levelId.forEach(_level => {
                      if (level.id == +_level) {
                        count++
                        this.$set(level, 'checked', true)
                      }
                    })
                  })
                  if (count) {
                    if (count < parent.levels.length) {
                      this.$set(parent, 'checked', false)
                      this.$set(parent, 'indeterminate', true)
                    } else {
                      this.$set(parent, 'checked', true)
                      this.$set(parent, 'indeterminate', false)
                    }
                  } else {
                    this.$set(parent, 'checked', false)
                    this.$set(parent, 'indeterminate', false)
                  }
                })
              })
            })
          }
          id.forEach(async (item, i) => {
            await waitFor(item, i)
          })
        }
      }
      if (!id.length) {
        this.levelPermission = []
      }
    },
    changeCurrentBtn () {
      this.$refs.editPermission.show()
      this.changeCurrent(this.currentBtn)
      this.currentBtn = '会员管理'
    },
    onLevelChange (res) {
      this.formKey.levelId = res
    },
    changeCurrent (stage) {
      this.currentBtn = stage
    },
    // 获取编辑后的权限
    savePremission () {
      this.postData.menu = JSON.parse(JSON.stringify(this.currentPermission))
      this.postData.menu.forEach(item => {
        item.newList = item.newList.filter(item => item.checked == true)
        item.newList.forEach(t => {
          delete t.checked
        })
      })
      this.postData.menu.forEach(item => {
        item.list = {}
        item.newList.forEach((temp, index) => {
          item.list[temp.name] = temp.value
        })
        delete item.newList
      })
      this.$refs.editPermission.hide()
    },
    // 确认新增信息的保存
    saveAll () {
      this.$refs.formKey.validate(valid => {
        if (valid) {
          let {
            userName,
            password,
            otherName,
            maxAddMoney,
            siteId,
            status
          } = this.formKey
          if (!maxAddMoney) {
            this.formKey.maxAddMoney = 0
          }
          let arr = []
          let data = {
            userName,
            password,
            otherName,
            maxAddMoney,
            siteId: siteId.join(','),
            status
          }
          this.levelPermission.forEach(item => {
            for (let key in item) {
              item.levels.forEach(site => {
                if (site.checked) arr.push(site.id)
              })
            }
          })
          arr = Array.from(new Set(arr))
          data.levelId = arr.join(',')
          // 不编辑权限直接保存 做判断
          // this.postData.menu.forEach((one,index1) => {
          //   this.exitAuthMenu.forEach((two,index2) => {
          //     for(let key1 in this.postData.menu[index1].list) {
          //       for(let key2 in this.exitAuthMenu[index1].list) {
          //         if (key1 == key2) {
          //           return false
          //         }
          //         return false
          //       }
          //     }
          //   })
          // })
          if (this.postData.menu.length > 1) {
            data.menu = JSON.stringify(this.postData.menu)
          }
          if (this.$route.params.page == 'add') {
            adminNewAdd(data).then(res => {
              if (res.code == 200) this.$router.push({ name: 'admin' })
            })
          } else {
            data.adminId = this.$route.query.id
            adminNewUpdate(data).then(res => {
              if (res.code == 200) this.$router.push({ name: 'admin' })
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.bd-bg {
  background-color: #2d8cf0;
  color: #ffffff;
  box-shadow: 0;
  &:focus {
    box-shadow: 0 0 0 0;
  }
}
.bg-or {
  border: 1px solid #eaeaea;
  &:focus {
    box-shadow: 0 0 0 0;
  }
  &:hover {
    background: #f4f9ff;
    border: 1px solid #2d8cf0;
    color: #2d8cf0;
  }
}
.pre {
  display: block;
  width: 17%;
  float: left;
  margin-left: 20px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e4e4e4;
  margin-top: 20px;
  margin-block-end: 20px;
}
.tijiao {
  display: block;
  width: 260px;
  margin: 20px auto;
  background-color: #2d8cf0;
  color: #ffffff;
  height: 50px;
}
/deep/.origin{
  button{
    display: inline-block;
    width: 320px;
    background: #2D8CF0;
    color: #ffffff;
  }
}
</style>
