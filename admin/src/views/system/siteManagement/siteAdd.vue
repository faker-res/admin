<template>
  <div>
    <Form ref="siteInfo" :model="siteInfo" :rules="rules" :label-width="130">
      <div class="clearfix">
        <p class="blue-font-nc mt20 mb10">站点信息</p>
        <FormItem label="站点代号" prop="siteCode" class="fl w50">
          <Input v-model="siteInfo.siteCode" class="w260x"/>
        </FormItem>
        <FormItem label="站点名称" prop="siteName" class="fl w50">
          <Input v-model="siteInfo.siteName" class="w260x"/>
        </FormItem>
      </div>
      <div>
        <RebateSelect
          class="ml20"
          ref="rebateSelect"
          @on-rebate-change="onRebateChange"
          :data="rebateData"
        ></RebateSelect>
      </div>
    </Form>
    <Form :model="siteInfo.siteConfig.limit" ref="limit" :rules="otherRules" :label-width="130" class="clearfix">
      <div class="clearfix bt">
        <p class="blue-font-nc mt20 mb10">站点设置</p>
        <!-- 服务器下拉框 -->
        <Form :label-width="130">
          <FormItem label="服务器" class="fl w45" prop="dbid" v-if="!$route.query.id">
            <Select class="w360x" v-model="siteInfo.siteConfig.dbid">
              <Option v-for="(t,i) in dbLsit" :key="i" :value="t.db_id">{{t.db_name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="快三样式" class="fl w45">
            <Select v-model="siteInfo.siteConfig.k3Theme" class="w360x">
              <Option value="default">默认样式</Option>
              <Option value="k3Theme">主题一</Option>
            </Select>
          </FormItem>
        </Form>
        <!-- limit字段中的值 -->
        <FormItem label="待出款免审核" class="fl w45">
          <Input
            v-model="siteInfo.siteConfig.limit.checkBetAmount"
            class="w360x"
            placeholder="0’或‘空’表示都需要审核打码"
          />
        </FormItem>
        <FormItem label="自动出款上限" class="fl w45">
          <Input
            v-model="siteInfo.siteConfig.limit.onlineForceAudit"
            class="w360x"
            placeholder="0’或‘空’表示无上限"
          />
        </FormItem>
        <FormItem label="最低存款" prop="paymentLimit" class="fl w45">
          <Input
            class="w360x"
            placeholder="请输入最低存款"
            v-model="siteInfo.siteConfig.limit.paymentLimit"
          />
        </FormItem>
        <FormItem label="最低取款" prop="withdrawalsLimit" class="fl w45">
          <Input
            class="w360x"
            placeholder="请输入最低取款"
            v-model="siteInfo.siteConfig.limit.withdrawalsLimit"
          />
        </FormItem>
        <FormItem label="汇款赠送比例" prop="paymentBonus" class="fl w45">
          <Input
            class="w360x"
            placeholder="请输入汇款赠送比例"
            v-model="siteInfo.siteConfig.limit.paymentBonus"
          />
        </FormItem>
        <FormItem label="彩票最低下注" prop="lotteryBetMin" class="fl w45">
          <Input
            class="w360x"
            placeholder="请输入彩票最低下注"
            v-model="siteInfo.siteConfig.limit.lotteryBetMin"
          />
        </FormItem>
        <FormItem label="彩票最高下注" prop="lotteryBetMax" class="fl w45">
          <Input
            class="w360x"
            placeholder="请输入彩票最高下注"
            v-model="siteInfo.siteConfig.limit.lotteryBetMax"
          />
        </FormItem>
        <FormItem label="取款打码倍数" prop="withdrawalsMultiple" class="fl w45">
          <Input
            class="w360x"
            placeholder="请输入取款打码倍数"
            v-model="siteInfo.siteConfig.limit.withdrawalsMultiple"
          />
        </FormItem>
        <!-- 活动图 -->
        <Form
          :model="siteInfo.siteConfig.activity_pic_size"
          :rules="picSizeRules"
          :label-width="130"
          ref="activity_pic_size"
          class="clearfix"
        >
          <FormItem label="PC活动图" prop="activity_pc" class="fl w45">
            <Input
              v-model="siteInfo.siteConfig.activity_pic_size.activity_pc"
              placeholder="如1000X150"
              class="w360x"
            />
          </FormItem>
          <FormItem label="移动端活动图" prop="activity_app" class="fl w45">
            <Input
              v-model="siteInfo.siteConfig.activity_pic_size.activity_app"
              placeholder="如750X270"
              class="w360x"
            />
          </FormItem>
        </Form>
        <!-- banner图 -->
        <Form
          :model="siteInfo.siteConfig.banner_pic_size"
          :label-width="130"
          ref="banner_pic_size"
          :rules="bannerRules"
          class="clearfix"
        >
          <FormItem label="移动banner图" class="fl w45" prop="banner_app">
            <Input
              class="w360x"
              v-model="siteInfo.siteConfig.banner_pic_size.banner_app"
              placeholder="请输入移动端banner图,750x270"
            />
          </FormItem>
          <FormItem label="PCbanner图" class="fl w45" prop="banner_pc">
            <Input
              class="w360x"
              v-model="siteInfo.siteConfig.banner_pic_size.banner_pc"
              placeholder="请输入PCbanner图,如 1920x410"
            />
          </FormItem>
        </Form>
        <FormItem label="运营模式" prop="site_model" class="fl w45">
          <Select v-model="siteInfo.siteConfig.site_model" class="w360x">
            <Option value="invite_link">邀请链接</Option>
            <Option value="invite_code">邀请码</Option>
          </Select>
        </FormItem>
        <FormItem label="网站维护" class="fl w100 bt mt20 pre">
          <div class="mt20">
            <Switch v-model="newStatus"></Switch>
            <span class="pl10 pr10" v-show="newStatus">开始日期</span>
            <DatePicker
              v-show="newStatus"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              class="w260x"
              placeholder="请选择日期"
              v-model="siteInfo.siteConfig.close.timeStart"
            ></DatePicker>
            <span class="pl30 pr10" v-show="newStatus">结束日期</span>
            <DatePicker
              v-show="newStatus"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              class="w260x"
              placeholder="请选择日期"
              v-model="siteInfo.siteConfig.close.timeEnd"
            ></DatePicker>
          </div>
          <div v-show="newStatus">
            <Input
              style="width: 70%;"
              class="mt20"
              type="textarea"
              :rows="4"
              v-model="siteInfo.siteConfig.close.tip"
            />
          </div>
        </FormItem>
        <FormItem label="注册配置" class="fl w100 bt mt20 pre">
          <div class="mt20">
            <ButtonGroup>
              <Button
                @click="() => {currentBtn = 'pc'}"
                :class="currentBtn == 'pc' ? 'bd-bg mr20':'bg-or mr20'"
              >PC注册配置</Button>
              <Button
                @click="() => {currentBtn = 'h5'}"
                :class="currentBtn == 'h5' ? 'bd-bg mr20':'bg-or mr20'"
              >H5注册配置</Button>
              <Button
                @click="() => {currentBtn = 'app'}"
                :class="currentBtn == 'app' ? 'bd-bg':'bg-or'"
              >APP注册配置</Button>
            </ButtonGroup>
            <CheckboxGroup
              v-model="checkedArr.pc"
              class="mt15"
              v-if="currentBtn == 'pc'"
              style="marginLeft: 50px;"
            >
              <Checkbox label="phone">手机</Checkbox>
              <Checkbox label="email" class="ib ml20">邮箱</Checkbox>
              <Checkbox label="wechat" class="ib ml20">微信</Checkbox>
              <Checkbox label="realName" class="ib ml20">真实姓名</Checkbox>
              <Checkbox label="payPassword" class="ib ml20">支付密码</Checkbox>
              <Checkbox label="registerOnOff" class="ib ml20">注册开关</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup
              v-model="checkedArr.h5"
              class="mt15"
              v-if="currentBtn == 'h5'"
              style="marginLeft: 50px;"
            >
              <Checkbox label="phone" class="ib ml20">手机</Checkbox>
              <Checkbox label="email" class="ib ml20">邮箱</Checkbox>
              <Checkbox label="wechat" class="ib ml20">微信</Checkbox>
              <Checkbox label="realName" class="ib ml20">真实姓名</Checkbox>
              <Checkbox label="payPassword" class="ib ml20">支付密码</Checkbox>
              <Checkbox label="registerOnOff" class="ib ml20">注册开关</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup
              v-model="checkedArr.app"
              class="mt15"
              v-if="currentBtn == 'app'"
              style="marginLeft: 50px;"
            >
              <Checkbox label="phone" class="ib ml20">手机</Checkbox>
              <Checkbox label="email" class="ib ml20">邮箱</Checkbox>
              <Checkbox label="wechat" class="ib ml20">微信</Checkbox>
              <Checkbox label="realName" class="ib ml20">真实姓名</Checkbox>
              <Checkbox label="payPassword" class="ib ml20">支付密码</Checkbox>
              <Checkbox label="registerOnOff" class="ib ml20">注册开关</Checkbox>
            </CheckboxGroup>
          </div>
        </FormItem>
        <FormItem label="客户链接" class="fl bt mt20 pre w100">
          <Tables
            :value="table.data"
            :columns="table.columns"
            :more="table.more"
            :page="false"
            class="mt20"
          >
            <div slot="footer">
              <a
                class="db-ma w120x"
                @click="addService"
                :style="{display: showAdd ? 'block' : 'none'}"
              >添加客服</a>
            </div>
          </Tables>
        </FormItem>
        <FormItem label="系统配置" class="fl w100 pre">
          <div class="mt20">
            <ButtonGroup>
              <Button
                @click="() => {sysBtn = 'android'}"
                :class="sysBtn == 'android' ? 'bd-bg mr20':'bg-or mr20'"
              >Android配置</Button>
              <Button
                @click="() => {sysBtn = 'ios'}"
                :class="sysBtn == 'ios' ? 'bd-bg mr20':'bg-or mr20'"
              >IOS配置</Button>
              <Button
                @click="() => {sysBtn = 'other'}"
                :class="sysBtn == 'other' ? 'bd-bg':'bg-or'"
              >其他配置</Button>
            </ButtonGroup>
            <div class="mt20 clearfix">
              <div v-show="sysBtn == 'android'" class="clearfix">
                <FormItem label="版本号" class="fl w40">
                  <Input class="w160x" v-model="Android.version"/>
                </FormItem>
                <FormItem label="下载链接" class="fl w40">
                  <Input class="w160x" v-model="Android.link"/>
                </FormItem>
                <FormItem label="提示文字" class="fl w40">
                  <Input class="w160x" v-model="Android.tip"/>
                </FormItem>
                <FormItem label="更新类型" class="fl w40">
                  <RadioGroup v-model="Android.type" class="type">
                    <Radio label="yes">
                      <span>强制更新</span>
                    </Radio>
                    <Radio label="no">
                      <span>不更新</span>
                    </Radio>
                    <Radio label="selectivity">
                      <span>选择性更新</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </div>
              <div v-show="sysBtn == 'ios'" class="clearfix">
                <FormItem label="版本号" class="fl w45">
                  <Input class="w160x" v-model="IOS.version"/>
                </FormItem>
                <FormItem label="下载链接" class="fl w45">
                  <Input class="w160x" v-model="IOS.link"/>
                </FormItem>
                <FormItem label="提示文字" class="fl w45">
                  <Input class="w160x" v-model="IOS.tip"/>
                </FormItem>
                <FormItem label="更新类型" class="fl w45">
                  <RadioGroup v-model="IOS.type" class="type">
                    <Radio label="yes">
                      <span>强制更新</span>
                    </Radio>
                    <Radio label="no">
                      <span>不更新</span>
                    </Radio>
                    <Radio label="selectivity">
                      <span>选择性更新</span>
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </div>
            </div>
            <div v-show="sysBtn == 'other'" class="clearfix w70 mt20">
              <FormItem label="主题">
                <Select class="w260x" v-model="siteInfo.siteConfig.theme">
                  <Option value="default">默认主题</Option>
                </Select>
              </FormItem>
              <FormItem label="静态资源路径">
                <Input class="w260x" v-model="siteInfo.siteConfig.statics"/>
              </FormItem>
              <FormItem label="APP域名">
                <Input
                  class="w260x"
                  type="textarea"
                  :rows="4"
                  v-model="siteInfo.siteConfig.app_domain"
                  placeholder="多个域名请用竖线隔开，例如aa.com|bb.com"
                />
              </FormItem>
            </div>
          </div>
        </FormItem>
      </div>
      <div>
        <Button
          type="primary"
          class="ivu-btn more-btn ml230"
          @click="submit"
        >{{$route.query.id ? '确认修改' : '确认添加'}}</Button>
        <Button class="cancel ml30" @click="cancel">{{$route.query.id ? '取消修改' : '取消创建'}}</Button>
      </div>
    </Form>
  </div>
</template>
<script>
import RebateSelect from "_c/rebate-select";
import Tables from "_c/tables";
import Sortable from "sortablejs";
import Icons from "_c/icons";
import { emptyRebateList } from "@/api/common";
import {
  siteManagementDetail,
  siteManagementCreate,
  siteManagementUpdate,
  siteManagementDbId
} from "@/api/system";
export default {
  name: "siteAdd",
  components: {
    RebateSelect,
    Tables,
    Icons
  },
  data() {
    return {
      newStatus: false,
      Android: {
        version: "",
        link: "",
        type: "",
        tip: ""
      },
      IOS: {
        version: "",
        link: "",
        type: "",
        tip: ""
      },
      dbLsit: [],
      showAdd: true, //客服链接显示隐藏
      table: {
        data: [],
        more: true,
        columns: [
          {
            title: "序号",
            align: "center",
            width: 60,
            render: (h, params) => <span>{params.index + 1}</span>
          },
          {
            title: "地址",
            key: "url",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      display: params.row.show ? "block" : "none"
                    }
                  },
                  params.row.url
                ),
                h("Input", {
                  props: {
                    value: params.row.url
                  },
                  style: {
                    display: params.row.show ? "none" : "block"
                  },
                  on: {
                    "on-blur": e => {
                      this.table.data[params.index].url = e.target.value;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              return h("i-switch", {
                props: {
                  value: params.row.status == "on" ? true : false
                },
                on: {
                  "on-change": val => {
                    this.table.data[params.index].status = val ? "on" : "off";
                  }
                }
              });
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              return (
                <div>
                  <a
                    style={{
                      marginRight: "10px",
                      display: params.row.show ? "inline-block" : "none"
                    }}
                    onClick={() => {
                      this.$set(params.row, "show", !params.row.show);
                    }}
                  >
                    编辑
                  </a>
                  <a
                    style={{
                      marginRight: "10px",
                      display: params.row.show ? "none" : "inline-block"
                    }}
                    onClick={() => {
                      if (params.row.url) {
                        this.$set(params.row, "show", !params.row.show);
                        this.showAdd = true;
                      } else {
                        this.$Message.error("请填写正确的地址");
                      }
                    }}
                  >
                    确认
                  </a>
                  <a
                    onClick={() => {
                      this.table.data.splice(params.index, 1);
                      this.showAdd = true;
                    }}
                  >
                    删除
                  </a>
                </div>
              );
            }
          }
        ]
      },
      checkedArr: {
        pc: [],
        h5: [],
        app: []
      }, //当前选中的中注册配置配置数据对象
      sysBtn: "android",
      currentBtn: "pc", //选中的注册配置方式
      siteInfo: {
        siteCode: "",
        siteName: "",
        siteConfig: {
          k3Theme: "",
          limit: {},
          close: {
            status: ""
          },
          register: {},
          rebateLotteryConfig: "",
          activity_pic_size: { activity_pc: "", activity_pc: "" },
          banner_pic_size: { banner_app: "", banner_app: "" }
        }
      },
      rebateData: [],
      rules: {
        siteCode: [
          {
            required: true,
            message: "站点码必须为两位以小写字母开头小写字母或数字结尾",
            trigger: "blur",
            pattern: /^[a-z][a-z0-9]{1,2}$/
          }
        ],
        siteName: [
          {
            required: true,
            message: "请输入站点名称",
            trigger: "blur"
          }
        ]
      },
      otherRules: {
        dbid: [
          {
            required: true,
            message: "请选择服务器",
            trigger: "change",
            pattern: /.+/
          }
        ],
        paymentLimit: [
          {
            required: true,
            message: "请输入最低存款",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        dbid: [
          {
            required: true,
            message: "请选择服务器id",
            trigger: "change",
            pattern: /.+/
          }
        ],
        withdrawalsLimit: [
          {
            required: true,
            message: "请输入最低取款",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        paymentBonus: [
          {
            required: true,
            message: "请输入汇款赠送比例",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        lotteryBetMin: [
          {
            required: true,
            message: "请输入彩票最低下注",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        lotteryBetMax: [
          {
            required: true,
            message: "请输入彩票最高下注",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        withdrawalsMultiple: [
          {
            required: true,
            message: "请输入取款打码倍数",
            trigger: "blur",
            pattern: /.+/
          }
        ]
      },
      picSizeRules: {
        activity_pc: [
          {
            required: true,
            message: "请输入PC端活动图尺寸",
            trigger: "blur"
          },
          {
            message: "请输入正确的活动图尺寸",
            trigger: "blur",
            pattern: /^[1-9]{1}\d{1,3}(\*|X|x)[1-9]{1}\d{1,3}$/
          }
        ],
        activity_app: [
          {
            required: true,
            message: "请输入移动端图片尺寸",
            trigger: "blur"
          },
          {
            message: "请输入正确的图片尺寸",
            trigger: "blur",
            pattern: /^[1-9]{1}\d{1,3}(\*|X|x)[1-9]{1}\d{1,3}$/
          }
        ]
      },
      bannerRules: {
        banner_pc: [
          {
            required: true,
            message: "请输入PC端banner图尺寸",
            trigger: "blur"
          },
          {
            message: "请输入正确的banner图尺寸",
            trigger: "blur",
            pattern: /^[1-9]{1}\d{1,3}(\*|X|x)[1-9]{1}\d{1,3}$/
          }
        ],
        banner_app: [
          {
            required: true,
            message: "请输入移动端banner图尺寸",
            trigger: "blur"
          },
          {
            message: "请输入正确的banner图尺寸",
            trigger: "blur",
            pattern: /^[1-9]{1}\d{1,3}(\*|X|x)[1-9]{1}\d{1,3}$/
          }
        ]
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const { id } = vm.$route.query;
      // 编辑
      if (id) {
        vm.getDetailData({ id });
      } else {
        // 新增
        vm.getEmptyRebate();
      }
    });
  },
  mounted() {
    this.getDBList();
    // this.$refs.bannerPicSize.resetFields()
    // this.$refs.picSizeForm.resetFields()
  },
  methods: {
    // 获取空的彩票返点数据
    getEmptyRebate() {
      emptyRebateList().then(res => {
        this.rebateData = res.data;
        this.rebateData.forEach(item => {
          item.rebate = "1.50";
          item.parent_rebate = "3.00";
        });
      });
    },
    // 获取服务器列表
    getDBList() {
      siteManagementDbId().then(res => {
        this.dbLsit = res.data;
        this.siteInfo.siteConfig.dbid = res.data[0].db_id;
      });
    },
    // 点击添加客服
    addService() {
      let obj = {
        url: "",
        status: "on",
        show: false
      };
      this.table.data.push(obj);
      this.showAdd = false;
    },
    //  获取编辑默认数据
    getDetailData(data) {
      siteManagementDetail(data).then(res => {
        this.siteInfo = res.data;
        let { Android, IOS } = res.data.siteConfig;
        if (Android.length < 1) {
          this.Android = {
            version: "",
            link: "",
            type: "",
            tip: ""
          };
        } else {
          this.Android = Android;
        }
        if (IOS.length < 1) {
          this.IOS = {
            version: "",
            link: "",
            type: "",
            tip: ""
          };
        } else {
          this.IOS = IOS;
        }
        this.rebateData = this.siteInfo.rebate;
        this.rebateData.forEach(item => {
          item.parent_rebate = "3.00";
        });
        if (!this.siteInfo.siteConfig.banner_pic_size) {
          this.siteInfo.siteConfig.banner_pic_size = {
            banner_app: "",
            banner_app: ""
          };
        }
        let { close, service } = this.siteInfo.siteConfig;
        service.forEach(item => (item.show = true));
        this.newStatus = close.status == "on" ? true : false;
        //处理后台新增的属性为null的情况
        if (!this.siteInfo.siteConfig.activity_pic_size) {
          this.siteInfo.siteConfig.activity_pic_size = {
            activity_pc: "",
            activity_app: ""
          };
        }
        this.checkedArr = this.siteInfo.siteConfig.register;
        this.table.data = service;
      });
    },
    onRebateChange(res) {
      this.siteInfo.siteConfig.rebateLotteryConfig = res;
    },
    // 成功后返回列表页
    goSiteList() {
      this.$router.push({
        name: "siteList"
      });
    },
    submit() {
      let arr = [];
      this.table.data.forEach(item =>
        arr.push({ url: item.url, status: item.status })
      );
      let {
        rebateLotteryConfig,
        k3Theme,
        register,
        close,
        limit,
        statics,
        app_domain,
        theme,
        site_model,
        activity_pic_size,
        dbid,
        banner_pic_size
      } = this.siteInfo.siteConfig;
      let { siteCode, siteName } = this.siteInfo;
      let data = {
        k3Theme,
        register: this.checkedArr,
        close,
        limit,
        statics,
        app_domain,
        theme,
        Android: this.Android,
        IOS: this.IOS,
        site_model,
        service: arr,
        activity_pic_size,
        banner_pic_size
      };
      data.close.status = this.newStatus ? "on" : "off";
      data.close.timeStart = this.$root.formatTimeS(close.timeStart);
      delete data.close.timeStart;
      if (data.close.timeEnd) {
        data.close.timeEnd = this.$root.formatTimeS(close.timeEnd);
      } else {
        delete data.close.timeEnd;
      }
      let postData = {};
      let flag1, flag2, flag3, flag4;
      // 表单验证
      this.$refs.siteInfo.validate(valid => {
        flag1 = valid ? true : false;
      });
      this.$refs.limit.validate(valid => {
        flag2 = valid ? true : false;
      });
      this.$refs.banner_pic_size.validate(valid => {
        flag3 = valid ? true : false;
      });
      this.$refs.activity_pic_size.validate(valid => {
        flag4 = valid ? true : false;
      });
      if (flag1 && flag2 && flag3 && flag4) {
        if (!rebateLotteryConfig) {
          rebateLotteryConfig = this.$refs.rebateSelect.createData();
        }
        if (this.$route.query.id) {
          postData = {
            id: this.$route.query.id,
            siteCode,
            siteName,
            rebateLotteryConfig,
            siteConfig: JSON.stringify(data)
          };
          siteManagementUpdate(postData).then(res => {
            if (res.code == 200) {
              this.goSiteList();
            }
          });
        } else {
          postData = {
            siteCode,
            siteName,
            dbid,
            rebateLotteryConfig,
            siteConfig: JSON.stringify(data)
          };
          siteManagementCreate(postData).then(res => {
            if (res.code == 200) {
              this.goSiteList();
            }
          });
        }
      }
    },
    cancel() {
      this.goSiteList();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.status-button {
  button {
    width: 130px !important;
    margin-left: 20px !important;
  }
}
.db-ma {
  display: block;
  margin: 0 auto;
}
.cancel {
  background: #a2a2a2;
  width: 140px;
  height: 50px;
  color: #ffffff;
  font-size: 17px;
}
.bd-bg {
  width: 277px;
  background-color: #2d8cf0;
  color: #ffffff;
  box-shadow: 0;
  &:focus {
    box-shadow: 0 0 0 0;
  }
}
.bg-or {
  width: 277px;
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
</style>

