
declare @row_cnt int = 0
declare @sql nvarchar(2990)

declare @rst nvarchar(max)
set @rst = ''

declare @tblname varchar(50)
DECLARE cur CURSOR FOR				
	select [name] from sysobjects 
	where 
		1=1
		and (type = 'u') 
	--and name like '%select%'
	order by name
OPEN cur
FETCH NEXT FROM cur 
INTO @tblname

WHILE @@FETCH_STATUS = 0  
BEGIN

	if exists(select * from syscolumns where id=object_id(@tblname) and name='id')
	begin
		set @sql = 'select * from ' + @tblname + ' where id = ''1169'';'
		print @sql
		exec sp_executesql @sql
		set @row_cnt = @@rowcount
		if @row_cnt > 0
		begin
			set @rst  = @rst + @sql + CHAR(10)
			--print @sql
			set @row_cnt = 0
		end
		--print 'select top 10 * from ' + @tblname + ' where id = 1169'
	end
	
				
FETCH NEXT FROM cur 
INTO @tblname

END

CLOSE cur
DEALLOCATE cur  

print '--------------------------------------- rst -------------------------------------'
print @rst

select * from sysobjects 
where 
	1=1
	and (type = 'u') 
	and name like 'formtable_main%'
order by name


--select * from bill_workinfo

--select * from workflow_base order by id 


declare @tblname varchar(50)
DECLARE cur CURSOR FOR				
	select [name] from sysobjects 
	where 
		1=1
		and (type = 'u') 
	and name like '%select%'
	order by name
OPEN cur
FETCH NEXT FROM cur 
INTO @tblname

WHILE @@FETCH_STATUS = 0  
BEGIN

	print 'select top 10 * from ' + @tblname
				
FETCH NEXT FROM cur 
INTO @tblname

END

CLOSE cur
DEALLOCATE cur  

--select * from workflow_base where id = 123

--select * from workflow_type where id = 14
select * from workflow_requestlog where requestid = 28541
select top 50 * from workflow_requestbase where requestid = 28541
--select top 10 * from workflow_form where requestid = 28541
--select top 10 * from workflow_formbase

--select * from workflow_bill where id = 6745

select * from workflow_nodebase where id in (1049,1050,1053,1054,1055)

--select * from workflow_nodebase where nodename like '%提交申请%'

select * from workflow_nownode where requestid = 28541


select * from workflow_SelectItem where selectname = '集团后勤'






/*
formtable_main_3 项目主表

*/




--1、	合同流转
select 
	fm4.requestId,fm4.lcbh,fm4.xmbh,fm4.htbh,fm4.jedx,fm4.xz,fm4.htkssj,fm4.htjsrq,fm4.htqdrq 
	,fm3.xmmc,fm3.xmfzr,fm3.zbbm,fm3.dfdw,fm3.yjkssj,fm3.yjjssj,fm3.yjxmsr,fm3.yjxmzc,fm3.cybm,fm3.xmgsgs,fm3.xmgk
from 
	formtable_main_4 as fm4
	left outer join formtable_main_3 fm3 on fm4.xmbh = fm3.id
order by fm4.xmbh desc


--2、	开票申请
select
	fm5.requestId,fm5.lcbh,fm5.lxbh,fm5.htxz,fm5.jedx,fm5.kpnr,fm5.kpbz
	,fm3.xmmc,fm3.xmfzr,fm3.zbbm,fm3.dfdw,fm3.yjkssj,fm3.yjjssj,fm3.yjxmsr,fm3.yjxmzc,fm3.cybm,fm3.xmgsgs,fm3.xmgk
	,fm4.requestId,fm4.lcbh,fm4.xmbh,fm4.htbh,fm4.jedx,fm4.xz,fm4.htkssj,fm4.htjsrq,fm4.htqdrq 
from 
	formtable_main_5 fm5
	left outer join formtable_main_3 fm3 on fm5.lxbh = fm3.id
	left outer join formtable_main_4 fm4 on fm5.htxz = fm4.id


--3、	付款申请
select 
	fm9.requestId,fm9.lcbh,fm9.xmbh,fm9.htbh,fm9.jine,fm9.fklx,fm9.fkxz
	,fm3.xmmc,fm3.xmfzr,fm3.zbbm,fm3.dfdw,fm3.yjkssj,fm3.yjjssj,fm3.yjxmsr,fm3.yjxmzc,fm3.cybm,fm3.xmgsgs,fm3.xmgk
	,fm4.requestId,fm4.lcbh,fm4.xmbh,fm4.htbh,fm4.jedx,fm4.xz,fm4.htkssj,fm4.htjsrq,fm4.htqdrq 
from 
	formtable_main_9 fm9
	left outer join formtable_main_3 fm3 on fm9.xmbh = fm3.id
	left outer join formtable_main_4 fm4 on fm9.htbh = fm4.id


--4、	多项目付款
select 
	fm9.requestId,fm9.lcbh,fm9.xmbh,fm9.htbh,fm9.jine,fm9.fklx,fm9.fkxz
	,fm9_1.xmbh,fm9_1.xmmc,fm9_1.skdw,fm9_1.je,fm9_1.yt
	,fm3.xmmc,fm3.xmfzr,fm3.zbbm,fm3.dfdw,fm3.yjkssj,fm3.yjjssj,fm3.yjxmsr,fm3.yjxmzc,fm3.cybm,fm3.xmgsgs,fm3.xmgk
	,fm4.requestId,fm4.lcbh,fm4.xmbh,fm4.htbh,fm4.jedx,fm4.xz,fm4.htkssj,fm4.htjsrq,fm4.htqdrq 
from 
	formtable_main_9 fm9
	left outer join formtable_main_3 fm3 on fm9.xmbh = fm3.id
	left outer join formtable_main_4 fm4 on fm9.htbh = fm4.id
	left outer join formtable_main_9_dt1 fm9_1 on fm9.xmbh = fm9_1.xmbh
order by fm9.xmbh desc



--5、	其他费用报销
select
	fm13.lcbh,fm13.xmbh,fm13.jehj,fm13.xmmc
from 
	formtable_main_13 fm13

	
--6、	劳务费用报销申请
select
	fm12.lcbh,fm12.xmbh,fm12.xmmc,fm12.sfjehj,fm12.yfjehj
from 
	formtable_main_12 fm12


--7、	差旅费报销
select
	fm11.lcbh,fm11.xmbh,fm11.xmmc,fm11.jehj
from 
	formtable_main_11 fm11





	
select
* 
from 
	formtable_main_72 fm72
	left outer join formtable_main_3 fm3 on fm72.xmbh = fm3.id
order by 
	fm72.id desc









--1
select 
	fm4.requestId as '工作流序号', wf_req.requestname as '工作流名称',
	fm4.lcbh as '流程编号', hr.lastname as '项目负责人',fm4.htbh as '合同编号',fm4.htmc as '合同名称',fm4.je as '金额',fm4.jedx as '金额大写',fm4.dfdw as '对方单位'
	,case when fm4.xz = '0' then '销售' else '采购' end as '合同性质'
	,fm4.htkssj as '合同开始日期',fm4.htjsrq as '合同结束日期',fm4.htqdrq as '合同签订日期',fm4.sksj as '收款/付款时间、金额'
	,fm3.xmmc as '项目名称',fm3.lxbh as '立项编号',fm3.yjxmsr as '预计项目收入',fm3.yjxmzc as '预计项目支出', dept.departmentname as '主办部门'
	,stuff(
		(select 
			',' +departmentname
		from 
			HrmDepartment
		where
			1=1
			and (',' + cast(fm3.cybm as varchar) + ',') like ('%,'+cast(id as varchar)+',%')
			FOR XML PATH('')
		)
		,1,0,''
	) + ','  as '参与部门'
	,case when fm3.xmgsgs = '0' then '教软' else '电达' end as '归属公司'
	,case when fm3.xmzt = '0' then '有效' else '关闭' end as '项目状态'
	,case when fm3.xmlx = '0' then '项目类' else '非项目类' end as '立项类别'
	,case 
		when fm3.xmlb = 0 then '软件开发类'
		when fm3.xmlb = 1 then '资源建设类'
		when fm3.xmlb = 2 then '维护服务类'
		when fm3.xmlb = 3 then '系统集成类'
		when fm3.xmlb = 4 then '策划推广类'
		when fm3.xmlb = 5 then '其他类'
		when fm3.xmlb = 6 then '技术运维类'
		when fm3.xmlb = 7 then '设备租赁类'
		when fm3.xmlb = 8 then '服务租赁类'
		else '-'
	end as '项目类别'
from 
	formtable_main_4 fm4
	left outer join formtable_main_3 fm3 on fm4.xmbh = fm3.id
	inner join HrmDepartment dept on fm3.zbbm = dept.id
	left outer join HrmResource hr on fm4.xmbzr = hr.id
	left outer join workflow_requestbase wf_req on fm4.requestId = wf_req.requestid
where
	1=1
	and fm4.bm = 9
	and fm3.xmzt = '0' 
	and fm4.htbh != ''
	--and fm3.zbbm = 9 
	and fm3.formmodeid is not null
order by 
	fm4.id desc
	,fm3.id desc

	


--2
select
	--*,
	fm5.requestId as '工作流序号', wf_req.requestname as '工作流名称',
	fm5.lcbh as '流程编号', fm3.lxbh as '立项编号' ,fm5.htxz
	,hr.lastname as '开票申请人'
	,dept.departmentname as '部门'
	, case when fm5.sqkpdw = '0' then '教软' else '电达' end as '申请开票单位'
	,case when fm5.sqfplx = 0 then '增值税专用发票' else '增值税普通发票' end as '申请发票类型',fm5.riqi as '开票日期'
	,fm5.jfqc as '甲方全称',fm5.jfdh as '甲方电话', fm5.jfdz as '甲方地址', fm5.khyh as '开户银行',fm5.jfsh as '甲方税号', fm5.yhzh as '银行账号', fm5.je as '金额',fm5.jedx as '金额大写'
	,fm5.kpnr as '开票内容',fm5.kpbz as '开票备注'
from
	formtable_main_5 fm5
	left outer join HrmDepartment dept on fm5.bumen = dept.id
	left outer join (select * from formtable_main_3 where xmzt = '0' and formmodeid is not null) fm3 on fm5.lxbh = fm3.id
	left outer join HrmResource hr on fm5.kpsqr = hr.id
	left outer join workflow_requestbase wf_req on fm5.requestId = wf_req.requestid
where
	1=1
	and fm5.bumen = 9
order by 
	cast(fm5.lxbh as int) desc
	,fm5.id desc


--3
select
	top 30
	fm9.requestId as '工作流序号', wf_req.requestname as '工作流名称'
	,fm9.lcbh as '流程编号', fm9.sqrq as '申请日期',hr.lastname as '付款申请人', dept.departmentname as '申请部门', fm4.htbh as '合同编号',fm9.skdw as '收款单位'
	,fm3.lxbh as '立项编号', fm3.xmmc as '项目名称',hr2.lastname as '项目负责人',dept2.departmentname as '主办部门'
	,case when fm9.gsgs = '0' then '教软' else '电达' end as '归属公司'
	,fm9.zhanghao as '账号',fm9.khyh as '开户银行',fm9.yt as '用途',fm9.beizhu as '备注'

	,fm9.fkfs as '付款方式'
	,case 
		when fm9.fkxz = 0 then '首款'
		when fm9.fkxz = 1 then '中期'
		when fm9.fkxz = 2 then '尾款'
		when fm9.fkxz = 3 then '一次性支付'
	 end as '付款性质' 
	,case 
		when fm9.fklx = 0 then '合同付款（技术服务类）'
		when fm9.fklx = 1 then '合同付款（固定资产类）'
		when fm9.fklx = 2 then '合同付款（其他类）'
		when fm9.fklx = 3 then '非合同付款'
	 end as '付款类型'

	,fm9.sjfkqk as '实际付款情况'
	,fm9.jine as '发票金额', fm9.jinedaxie as '金额大写',fm9.sjfkje as '实际付款金额', fm9.sjzfdx as '实际付款大写'
from 
	formtable_main_9 fm9
	inner join formtable_main_3 fm3 on fm9.xmbh = fm3.id
	left outer join formtable_main_4 fm4 on fm9.htbh = fm4.id
	inner join HrmDepartment dept on fm9.sqbm = dept.id
	left outer join HrmDepartment dept2 on fm3.zbbm = dept2.id
	left outer join HrmResource hr on fm9.fksqr = hr.id
	left outer join HrmResource hr2 on fm3.xmfzr = hr2.id
	left outer join workflow_requestbase wf_req on fm9.requestId = wf_req.requestid
where
	1=1
	and fm9.sqbm = 9
order by 
	fm3.id desc,
	fm9.id desc


--4
select
	top 30
	fm9.requestId as '工作流序号', wf_req.requestname as '工作流名称'
	,fm9.lcbh as '流程编号', fm9.sqrq as '申请日期',hr.lastname as '付款申请人', dept.departmentname as '申请部门'
	,fm3.lxbh as '立项编号', fm3.xmmc as '项目名称',hr2.lastname as '项目负责人',dept2.departmentname as '主办部门'
	,fm9_1.skdw as '收款单位',fm9_1.zh as '账号',fm9_1.khyx as '开户银行',fm9_1.yt as '用途',fm9_1.bz as '备注'
	,fm9_1.fkfs as '付款方式'
	,case 
		when fm9_1.fkxz = 0 then '首款'
		when fm9_1.fkxz = 1 then '中期'
		when fm9_1.fkxz = 2 then '尾款'
		when fm9_1.fkxz = 3 then '一次性支付'
	 end as '付款性质' 
	,case when fm9_1.gsgs = '0' then '教软' else '电达' end as '归属公司'
	, fm9_1.je as '金额'
from 
	formtable_main_9_dt1 fm9_1
	inner join formtable_main_9 fm9 on fm9_1.mainid = fm9.id
	inner join formtable_main_3 fm3 on fm9_1.xmbh = fm3.id
	inner join HrmResource hr on fm9.fksqr = hr.id	
	inner join HrmResource hr2 on fm3.xmfzr = hr2.id
	inner join HrmDepartment dept on fm9.sqbm = dept.id
	inner join HrmDepartment dept2 on fm9_1.zbbm = dept2.id
	inner join workflow_requestbase wf_req on fm9.requestId = wf_req.requestid
where
	1=1
order by
	fm9.id desc,
	fm9_1.id desc


--5
select 
	top 30
	fm13.requestId as '工作流序号', wf_req.requestname as '工作流名称'
	,fm13.lcbh as '流程编号', fm13.sqrq as '申请日期',hr.lastname as '报销申请人', dept.departmentname as '申请部门'
	,fm3.lxbh as '立项编号', fm3.xmmc as '项目名称',hr2.lastname as '项目负责人',dept2.departmentname as '主办部门'
	,case when fm13.ssgs = '0' then '教软' else '电达' end as '所属公司'
	,fm13.jehj as '金额合计', fm13.fdjzs as '附单据张数'
from 
	formtable_main_13 fm13
	inner join formtable_main_3 fm3 on fm13.xmbh = fm3.id
	inner join HrmDepartment dept on fm13.sqbm = dept.id
	inner join HrmDepartment dept2 on fm3.zbbm = dept2.id
	inner join HrmResource hr on fm13.bxsqr = hr.id
	left outer join HrmResource hr2 on fm3.xmfzr = hr2.id
	inner join workflow_requestbase wf_req on fm13.requestId = wf_req.requestid
where
	1=1
order by
	fm13.id desc


--6
select 
	top 30
	fm12.requestId as '工作流序号', wf_req.requestname as '工作流名称'
	,fm12.lcbh as '流程编号', fm12.bxrq as '报销日期',hr.lastname as '报销人', dept.departmentname as '报销部门'
	,fm3.lxbh as '立项编号', fm3.xmmc as '项目名称',hr2.lastname as '项目负责人',dept2.departmentname as '主办部门'
	,case when fm12.gsgs = '0' then '教软' else '电达' end as '所属公司'
	,fm12.sfjehj as '实发金额合计',fm12.yfjehj as '应发金额合计',fm12.fdjzs as '附单据张数'
from 
	formtable_main_12 fm12
	inner join formtable_main_3 fm3 on fm12.xmbh = fm3.id
	inner join HrmDepartment dept on fm12.bxbm = dept.id
	inner join HrmDepartment dept2 on fm3.zbbm = dept2.id
	inner join HrmResource hr on fm12.bxr = hr.id
	left outer join HrmResource hr2 on fm3.xmfzr = hr2.id
	inner join workflow_requestbase wf_req on fm12.requestId = wf_req.requestid
where
	1=1
order by
	fm12.id desc


--7
select 
	top 30
	fm11.requestId as '工作流序号', wf_req.requestname as '工作流名称'
	,fm11.lcbh as '流程编号', fm11.sqrq as '申请日期',hr.lastname as '报销人', dept.departmentname as '报销部门'
	,fm3.lxbh as '立项编号', fm3.xmmc as '项目名称',hr2.lastname as '项目负责人',dept2.departmentname as '主办部门'
	,case when fm11.gsgs = '0' then '教软' else '电达' end as '所属公司'
	,fm11.jehj as '金额合计',fm11.fdjzs as '附单据张数'
	,fm11.ccsy as '出差事由',fm11.bz as '备注'
from 
	formtable_main_11 fm11
	inner join formtable_main_3 fm3 on fm11.xmbh = fm3.id
	inner join HrmDepartment dept on fm11.bxbm = dept.id
	inner join HrmDepartment dept2 on fm3.zbbm = dept2.id
	inner join HrmResource hr on fm11.bxr = hr.id
	left outer join HrmResource hr2 on fm3.xmfzr = hr2.id
	inner join workflow_requestbase wf_req on fm11.requestId = wf_req.requestid
where
	1=1
order by
	fm11.id desc


