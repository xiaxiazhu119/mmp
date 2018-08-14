
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

--select * from workflow_nodebase where nodename like '%�ύ����%'

select * from workflow_nownode where requestid = 28541


select * from workflow_SelectItem where selectname = '���ź���'






/*
formtable_main_3 ��Ŀ����

*/




--1��	��ͬ��ת
select 
	fm4.requestId,fm4.lcbh,fm4.xmbh,fm4.htbh,fm4.jedx,fm4.xz,fm4.htkssj,fm4.htjsrq,fm4.htqdrq 
	,fm3.xmmc,fm3.xmfzr,fm3.zbbm,fm3.dfdw,fm3.yjkssj,fm3.yjjssj,fm3.yjxmsr,fm3.yjxmzc,fm3.cybm,fm3.xmgsgs,fm3.xmgk
from 
	formtable_main_4 as fm4
	left outer join formtable_main_3 fm3 on fm4.xmbh = fm3.id
order by fm4.xmbh desc


--2��	��Ʊ����
select
	fm5.requestId,fm5.lcbh,fm5.lxbh,fm5.htxz,fm5.jedx,fm5.kpnr,fm5.kpbz
	,fm3.xmmc,fm3.xmfzr,fm3.zbbm,fm3.dfdw,fm3.yjkssj,fm3.yjjssj,fm3.yjxmsr,fm3.yjxmzc,fm3.cybm,fm3.xmgsgs,fm3.xmgk
	,fm4.requestId,fm4.lcbh,fm4.xmbh,fm4.htbh,fm4.jedx,fm4.xz,fm4.htkssj,fm4.htjsrq,fm4.htqdrq 
from 
	formtable_main_5 fm5
	left outer join formtable_main_3 fm3 on fm5.lxbh = fm3.id
	left outer join formtable_main_4 fm4 on fm5.htxz = fm4.id


--3��	��������
select 
	fm9.requestId,fm9.lcbh,fm9.xmbh,fm9.htbh,fm9.jine,fm9.fklx,fm9.fkxz
	,fm3.xmmc,fm3.xmfzr,fm3.zbbm,fm3.dfdw,fm3.yjkssj,fm3.yjjssj,fm3.yjxmsr,fm3.yjxmzc,fm3.cybm,fm3.xmgsgs,fm3.xmgk
	,fm4.requestId,fm4.lcbh,fm4.xmbh,fm4.htbh,fm4.jedx,fm4.xz,fm4.htkssj,fm4.htjsrq,fm4.htqdrq 
from 
	formtable_main_9 fm9
	left outer join formtable_main_3 fm3 on fm9.xmbh = fm3.id
	left outer join formtable_main_4 fm4 on fm9.htbh = fm4.id


--4��	����Ŀ����
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



--5��	�������ñ���
select
	fm13.lcbh,fm13.xmbh,fm13.jehj,fm13.xmmc
from 
	formtable_main_13 fm13

	
--6��	������ñ�������
select
	fm12.lcbh,fm12.xmbh,fm12.xmmc,fm12.sfjehj,fm12.yfjehj
from 
	formtable_main_12 fm12


--7��	���÷ѱ���
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
	fm4.requestId as '���������', wf_req.requestname as '����������',
	fm4.lcbh as '���̱��', hr.lastname as '��Ŀ������',fm4.htbh as '��ͬ���',fm4.htmc as '��ͬ����',fm4.je as '���',fm4.jedx as '����д',fm4.dfdw as '�Է���λ'
	,case when fm4.xz = '0' then '����' else '�ɹ�' end as '��ͬ����'
	,fm4.htkssj as '��ͬ��ʼ����',fm4.htjsrq as '��ͬ��������',fm4.htqdrq as '��ͬǩ������',fm4.sksj as '�տ�/����ʱ�䡢���'
	,fm3.xmmc as '��Ŀ����',fm3.lxbh as '������',fm3.yjxmsr as 'Ԥ����Ŀ����',fm3.yjxmzc as 'Ԥ����Ŀ֧��', dept.departmentname as '���첿��'
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
	) + ','  as '���벿��'
	,case when fm3.xmgsgs = '0' then '����' else '���' end as '������˾'
	,case when fm3.xmzt = '0' then '��Ч' else '�ر�' end as '��Ŀ״̬'
	,case when fm3.xmlx = '0' then '��Ŀ��' else '����Ŀ��' end as '�������'
	,case 
		when fm3.xmlb = 0 then '���������'
		when fm3.xmlb = 1 then '��Դ������'
		when fm3.xmlb = 2 then 'ά��������'
		when fm3.xmlb = 3 then 'ϵͳ������'
		when fm3.xmlb = 4 then '�߻��ƹ���'
		when fm3.xmlb = 5 then '������'
		when fm3.xmlb = 6 then '������ά��'
		when fm3.xmlb = 7 then '�豸������'
		when fm3.xmlb = 8 then '����������'
		else '-'
	end as '��Ŀ���'
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
	fm5.requestId as '���������', wf_req.requestname as '����������',
	fm5.lcbh as '���̱��', fm3.lxbh as '������' ,fm5.htxz
	,hr.lastname as '��Ʊ������'
	,dept.departmentname as '����'
	, case when fm5.sqkpdw = '0' then '����' else '���' end as '���뿪Ʊ��λ'
	,case when fm5.sqfplx = 0 then '��ֵ˰ר�÷�Ʊ' else '��ֵ˰��ͨ��Ʊ' end as '���뷢Ʊ����',fm5.riqi as '��Ʊ����'
	,fm5.jfqc as '�׷�ȫ��',fm5.jfdh as '�׷��绰', fm5.jfdz as '�׷���ַ', fm5.khyh as '��������',fm5.jfsh as '�׷�˰��', fm5.yhzh as '�����˺�', fm5.je as '���',fm5.jedx as '����д'
	,fm5.kpnr as '��Ʊ����',fm5.kpbz as '��Ʊ��ע'
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
	fm9.requestId as '���������', wf_req.requestname as '����������'
	,fm9.lcbh as '���̱��', fm9.sqrq as '��������',hr.lastname as '����������', dept.departmentname as '���벿��', fm4.htbh as '��ͬ���',fm9.skdw as '�տλ'
	,fm3.lxbh as '������', fm3.xmmc as '��Ŀ����',hr2.lastname as '��Ŀ������',dept2.departmentname as '���첿��'
	,case when fm9.gsgs = '0' then '����' else '���' end as '������˾'
	,fm9.zhanghao as '�˺�',fm9.khyh as '��������',fm9.yt as '��;',fm9.beizhu as '��ע'

	,fm9.fkfs as '���ʽ'
	,case 
		when fm9.fkxz = 0 then '�׿�'
		when fm9.fkxz = 1 then '����'
		when fm9.fkxz = 2 then 'β��'
		when fm9.fkxz = 3 then 'һ����֧��'
	 end as '��������' 
	,case 
		when fm9.fklx = 0 then '��ͬ������������ࣩ'
		when fm9.fklx = 1 then '��ͬ����̶��ʲ��ࣩ'
		when fm9.fklx = 2 then '��ͬ��������ࣩ'
		when fm9.fklx = 3 then '�Ǻ�ͬ����'
	 end as '��������'

	,fm9.sjfkqk as 'ʵ�ʸ������'
	,fm9.jine as '��Ʊ���', fm9.jinedaxie as '����д',fm9.sjfkje as 'ʵ�ʸ�����', fm9.sjzfdx as 'ʵ�ʸ����д'
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
	fm9.requestId as '���������', wf_req.requestname as '����������'
	,fm9.lcbh as '���̱��', fm9.sqrq as '��������',hr.lastname as '����������', dept.departmentname as '���벿��'
	,fm3.lxbh as '������', fm3.xmmc as '��Ŀ����',hr2.lastname as '��Ŀ������',dept2.departmentname as '���첿��'
	,fm9_1.skdw as '�տλ',fm9_1.zh as '�˺�',fm9_1.khyx as '��������',fm9_1.yt as '��;',fm9_1.bz as '��ע'
	,fm9_1.fkfs as '���ʽ'
	,case 
		when fm9_1.fkxz = 0 then '�׿�'
		when fm9_1.fkxz = 1 then '����'
		when fm9_1.fkxz = 2 then 'β��'
		when fm9_1.fkxz = 3 then 'һ����֧��'
	 end as '��������' 
	,case when fm9_1.gsgs = '0' then '����' else '���' end as '������˾'
	, fm9_1.je as '���'
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
	fm13.requestId as '���������', wf_req.requestname as '����������'
	,fm13.lcbh as '���̱��', fm13.sqrq as '��������',hr.lastname as '����������', dept.departmentname as '���벿��'
	,fm3.lxbh as '������', fm3.xmmc as '��Ŀ����',hr2.lastname as '��Ŀ������',dept2.departmentname as '���첿��'
	,case when fm13.ssgs = '0' then '����' else '���' end as '������˾'
	,fm13.jehj as '���ϼ�', fm13.fdjzs as '����������'
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
	fm12.requestId as '���������', wf_req.requestname as '����������'
	,fm12.lcbh as '���̱��', fm12.bxrq as '��������',hr.lastname as '������', dept.departmentname as '��������'
	,fm3.lxbh as '������', fm3.xmmc as '��Ŀ����',hr2.lastname as '��Ŀ������',dept2.departmentname as '���첿��'
	,case when fm12.gsgs = '0' then '����' else '���' end as '������˾'
	,fm12.sfjehj as 'ʵ�����ϼ�',fm12.yfjehj as 'Ӧ�����ϼ�',fm12.fdjzs as '����������'
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
	fm11.requestId as '���������', wf_req.requestname as '����������'
	,fm11.lcbh as '���̱��', fm11.sqrq as '��������',hr.lastname as '������', dept.departmentname as '��������'
	,fm3.lxbh as '������', fm3.xmmc as '��Ŀ����',hr2.lastname as '��Ŀ������',dept2.departmentname as '���첿��'
	,case when fm11.gsgs = '0' then '����' else '���' end as '������˾'
	,fm11.jehj as '���ϼ�',fm11.fdjzs as '����������'
	,fm11.ccsy as '��������',fm11.bz as '��ע'
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


