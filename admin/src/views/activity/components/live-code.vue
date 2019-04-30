<template>
  <Tables
    :loading="$root.tableLaoding"
    :value="table.data"
    :total="table.total"
    :columns="table.columns"
  ></Tables>
</template>
<script>
import Tables from "_c/tables";
import Icons from "_c/icons";
import { codeMana } from "@/api/data";
export default {
  props: ['showBtn'],//true-不编辑
  components: {
    Tables,
    Icons
  },
  data() {
    return {
      originData: [],
      table: {
        loading: true,
        total: 100,
        data: [],
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center"
          },
          {
            title: "金管家等级",
            key: "level",
            align: "center"
          },
          {
            title: "累积打码",
            key: "code",
            align: "center",
            render: (h,params) => {
              return h('div',[
                h('span',{
                  style: {
                    display: this.showBtn ? 'block' : 'none'
                  }
                },params.row.code),
                h('Input',{
                  style: {
                    display: this.showBtn ? 'none' : 'block',
                    width: '95%',
                    margin: '0 auto'
                  },
                  props: {
                    value: params.row.code
                  },
                  on: {
                    'on-change': e => {
                      this.table.data[params.index].code = e.target.value
                      this.$emit('sendNewData',this.table.data)
                    }
                  }
                })
              ])
            }
          },
          {
            title: "晋级礼金",
            key: "bonus",
            align: "center",
            render: (h,params) => {
              return h('div',[
                h('span',{
                  style: {
                    display: this.showBtn ? 'block' : 'none'
                  }
                },params.row.bonus),
                h('Input',{
                  style: {
                    display: this.showBtn ? 'none' : 'block',
                    width: '95%',
                    margin: '0 auto'
                  },
                  props: {
                    value: params.row.bonus
                  },
                  on: {
                    'on-change': e => {
                      this.table.data[params.index].bonus = e.target.value
                      this.$emit('sendNewData',this.table.data)
                    }
                  }
                })
              ])
            }
          },
          {
            title: "月俸禄",
            key: "monWage",
            align: "center",
            render: (h,params) => {
              return h('div',[
                h('span',{
                  style: {
                    display: this.showBtn ? 'block' : 'none'
                  }
                },params.row.monWage),
                h('Input',{
                  style: {
                    display: this.showBtn ? 'none' : 'block',
                    width: '95%',
                    margin: '0 auto'
                  },
                  props: {
                    value: params.row.monWage
                  },
                  on: {
                    'on-change': e => {
                      this.table.data[params.index].monWage = e.target.value
                      this.$emit('sendNewData',this.table.data)
                    }
                  }
                })
              ])
            }
          },
          {
            title: "借呗额度",
            key: "borrowLimit",
            align: "center",
            render: (h,params) => {
              return h('div',[
                h('span',{
                  style: {
                    display: this.showBtn ? 'block' : 'none'
                  }
                },params.row.borrowLimit),
                h('Input',{
                  style: {
                    display: this.showBtn ? 'none' : 'block',
                    width: '95%',
                    margin: '0 auto'
                  },
                  props: {
                    value: params.row.borrowLimit
                  },
                  on: {
                    'on-change': e => {
                      this.table.data[params.index].borrowLimit = e.target.value
                      this.$emit('sendNewData',this.table.data)
                    }
                  }
                })
              ])
            }
          },
          {
            key: "status",
            align: "center",
            renderHeader: (h, params) => {
              return h("p", [
                h("span", "状态"),
                h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      content: "锁定会员不可自动晋级，可手动调节等级",
                      placement: "right",
                      style: {
                        marginTop: "-4px"
                      }
                    }
                  },
                  [
                    h(Icons, {
                      props: {
                        type: "bangzhutishi"
                      },
                      style: {
                        color: "#b3b3b3",
                        marginLeft: "5px"
                      }
                    })
                  ]
                )
              ]);
            },
            render: (h,params) => {
              return h('div',[
                h('span',{
                  style: {
                    color: params.row.status ? '#FF0000' : '',
                    display: this.showBtn ? 'block' : 'none',
                  }
                },params.row.status ? '已锁定' : '未锁定'),
                h('Select',{
                  style: {
                    display: this.showBtn ? 'none' : 'block',
                    width: '90px',
                    margin: '0 auto',
                    color: params.row.status ? '#FF0000' : ''
                  },
                  props: {
                    value: params.row.status ? 'off' : 'on'
                  },
                  on: {
                    'on-change': val => {
                      this.table.data[params.index].status = !this.table.data[params.index].status
                      this.$emit('sendNewData',this.table.data)
                    }
                  }
                },[
                  h('Option',{
                    props: {
                      value: 'off',
                      label: '已锁定'
                    }
                  }),
                  h('Option',{
                    props: {
                      value: 'on',
                      label: '未锁定'
                    }
                  })
                ])
              ])
            }
          },
          {
            title: "晋级总额",
            key: "upAll",
            align: "center"
          },
          {
            title: "总月俸禄",
            key: "monWageAll",
            align: "center"
          },
          {
            title: "更新时间",
            key: "updateTime",
            align: "center"
          }
        ]
      }
    };
  },
  mounted() {
    this.getData();
  },
   watch: {
    type: {
      handler(val,oldVal){
        this.getData()
      }
    }
  },
  methods: {
    getData() {
      codeMana().then(res => {
        this.table.data = res.data;
        this.originData = JSON.parse(JSON.stringify(res.data))
      });
    },
    //设置改变后的数据
    setNewData(data) {
      this.table.data = data
      this.originData = JSON.parse(JSON.stringify(this.table.data))
    },
    //取消编辑
    exit() {
      this.table.data = this.originData
      this.originData = JSON.parse(JSON.stringify(this.table.data))
    }
  }
};
</script>

