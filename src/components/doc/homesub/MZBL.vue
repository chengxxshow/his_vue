<template>
  <!-- 1. 门诊病历 -->
	<el-container v-loading="loading">
    <!-- 页面正文 -->
		<el-main style="width:100%;background:#fff;height:800px;overflow-y: auto">
			<el-form ref="form" :model="medicalRecord01" label-width="80px" label-position="left" size="mini" >
				<el-row style="background-color: #EAF1F5;margin-top: -20px">
				  	<el-col :span="8" style="margin-top: 4px;">

			  		</el-col>
			  		<el-col :span="4" >
				    <el-button type="text" size="small" class="el-icon-tickets" @click="stageCheck">暂存</el-button>
				    </el-col>
			  		<el-col :span="4" >
				    <el-button type="text" size="small" class="el-icon-success" @click="saveCheck">提交</el-button>
				    </el-col>
			  		<el-col :span="4" >
				    <el-button type="text" size="small" class="el-icon-printer" :disabled="isSaved" @click="cleanCheck">清空所有</el-button>
				    </el-col>
			  		<el-col :span="4" >
				    <el-button type="text" size="small" class="el-icon-circle-plus-outline" @click="refMedicalRecord">刷新</el-button>
				   </el-col>
				</el-row>
				<el-tag>病史内容：</el-tag>
				<el-form-item label="主诉">
			    <el-input type="textarea" :rows="1" v-model="medicalRecord01.Readme" :disabled="isSaved"></el-input>
				</el-form-item>
				<el-form-item label="现病史">
			    <el-input type="textarea" :rows="2" v-model="medicalRecord01.Present" :disabled="isSaved"></el-input>
				</el-form-item>
				<el-form-item label="现病治疗情况">
			    <el-input type="textarea" :rows="2" v-model="medicalRecord01.PresentTreat" :disabled="isSaved"></el-input>
				</el-form-item>
        <el-form-item label="既往史">
          <el-input type="textarea" :rows="2" v-model="medicalRecord01.History" :disabled="isSaved"></el-input>
        </el-form-item>
				<el-form-item label="过敏史">
			    <el-input type="textarea" :rows="2" v-model="medicalRecord01.Allergy" :disabled="isSaved"></el-input>
				</el-form-item>
			  <el-form-item label="体格检查">
			    <el-input type="textarea" :rows="2" v-model="medicalRecord01.Physique" :disabled="isSaved"></el-input>
			  </el-form-item>
        <el-tag>评估/诊断：</el-tag>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>西医诊断</span>
           </div>
         <el-table style="width: 100%;" size="mini" @selection-change="">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="DiseaseICD" label="ICD编码" width="150px">
            </el-table-column>
            <el-table-column prop="DiseaseName" label="名称" >
            </el-table-column>
            <el-table-column prop="GetSiskDate" label="发病时间" width="130px">
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="box-card">
          <div slot="header" >
            <span>中医诊断</span>
           
          </div>
          <el-table style="width: 100%;" size="mini" @selection-change="">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="DiseaseICD" label="ICD编码" width="150px">
            </el-table-column>
            <el-table-column prop="DiseaseName" label="名称" >
            </el-table-column>
            <el-table-column prop="GetSiskDate" label="发病时间" width="130px">
            </el-table-column>
          </el-table>
        </el-card>
			  <el-form-item label="检查建议">
			    <el-input type="textarea" :rows="2" v-model="medicalRecord01.Proposal" :disabled="isSaved"></el-input>
			  </el-form-item>
        <el-form-item label="注意事项">
          <el-input type="textarea" :rows="2" v-model="medicalRecord01.Careful" :disabled="isSaved"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" size="small" class="el-icon-success" @click="saveCheck">提交</el-button>
		</el-main>

	</el-container>
</template>

<script>
export default {
  mounted:function () {
  },
  methods: {

    //暂存
    stageCheck() {
      this.stageOrSave('1');
    },
    //提交
    saveCheck() {
      this.stageOrSave('2');
    },
    //保存
    stageOrSave(type){
    },

    //清空
    cleanCheck() {
      this.medicalRecord01 = {};
    },

    //刷新患者病历
    refMedicalRecord(){

    },
  },
  data() {
  	return {
      loading:false,

      keywords01: '',//1-西医   2-中医
      inputSearchDis:'',
      isSaved:false,
      medicalRecord01:{
        CaseNumber:'',RegistID:'',Readme:'',Present:'',PresentTreat:'',History:'',Allergy:'',
        Physique:'',Proposal:'',Careful:'',CheckResult:'',Diagnosis:'',Handling:'',CaseState:'',
      },

      
  	}
  }
}
</script>

<style>

</style>
