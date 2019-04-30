<template>
  <Select v-model="roleName" @on-change="onChange" multiple>
    <Option v-for="role in roleList" :key="role.id" :value="role.name">{{role.title}}</Option>
  </Select>
</template>
<script>
import { getRoleList } from "@/api/system";
export default {
  data() {
    return {
      roleName: [],
      roleList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    setDefaultRole(roles){
      this.roleName = roles;
    },
    async getData() {
      await getRoleList().then(res => {
        this.roleList = res.data.data
      });
    },
    onChange(res) {
      this.$emit("on-change", res);
    },
    resetSelect() {
      this.roleName = []
    }
  }
};
</script>
