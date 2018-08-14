--insert into
--[dbo].[RAEP_Infos]
--select
-- 1 as termid
-- , '2018年度'
-- ,0
-- , 省份
-- , 0
-- , 市
-- , 0
-- ,  区
--      ,[申报单位]
--      ,[申报工作业务单位]
--      ,[申报工作负责人]
--      ,[联系电话]
--      ,[申报工作联系人]
--      ,[联系电话1]
--      ,[邮箱地址]
--      ,[学习网站地址]
--	  ,'/files/upload/'
--      ,[自评工作报告] + '.htm'
--      ,[先行申报表] + '.htm'
--      ,[先行区自评表] + '.htm'
--	  ,null
--	  ,0
--	  ,0
--	  ,getdate()
--	  , 0
--  FROM [ResourceAllianceExhibitionPlatform].[dbo].[_impt]

--  delete from [dbo].[_impt]

  delete from [dbo].[RAEP_Info2Group] where groupid in (1,2)

  insert into [dbo].[RAEP_Info2Group] select 1,id from [dbo].[RAEP_Infos] where isdel = 0
  insert into [dbo].[RAEP_Info2Group] select 2,id from [dbo].[RAEP_Infos] where isdel = 0



  update infos
  set
	infos.ParentRegionId = r1.Id,
	infos.ChildRegionId = r2.Id,
	infos.ThirdRegionId = r3.Id
  from
	[dbo].[RAEP_Infos] infos 
	inner join [dbo].[RAEP_Sys_Region] r1 on infos.ParentRegionName = r1.name
	inner join [dbo].[RAEP_Sys_Region] r2 on infos.ChildRegionName = r2.name
	inner join [dbo].[RAEP_Sys_Region] r3 on infos.ThirdRegionName = r3.name


update 
[dbo].[RAEP_Infos]
 set 
 
 
  [TermName]=replace([TermName],char(10),'')
 , [ParentRegionName]=replace([ParentRegionName],char(10),'')
 , [ChildRegionName]=replace([ChildRegionName],char(10),'')
 , [ThirdRegionName]=replace([ThirdRegionName],char(10),'')
 , [Unit]=replace([Unit],char(10),'')
 , [BusinessUnit]=replace([BusinessUnit],char(10),'')
 , [PersonInCharge]=replace([PersonInCharge],char(10),'')
 , [PicPhone]=replace([PicPhone],char(10),'')
 , [Contact]=replace([Contact],char(10),'')
 , [ContactPhone]=replace([ContactPhone],char(10),'')
 , [ContactEmail]=replace([ContactEmail],char(10),'')
 , [WebUrl]=replace([WebUrl],char(10),'')
 , [AttachmentPath]=replace([AttachmentPath],char(10),'')
 , [SelfEvaluationReport]=replace([SelfEvaluationReport],char(10),'')
 , [PioneerDeclaration]=replace([PioneerDeclaration],char(10),'')
 , [PioneerSelfAssessment]=replace([PioneerSelfAssessment],char(10),'')
 , [SelfAssessmentScore]=replace([SelfAssessmentScore],char(10),'')
 , [SelfAssessmentTotalScore]=replace([SelfAssessmentTotalScore],char(10),'')

 update 
[dbo].[RAEP_Infos]
 set 
 
  [TermName]=replace([TermName],char(13),'')
 , [ParentRegionName]=replace([ParentRegionName],char(13),'')
 , [ChildRegionName]=replace([ChildRegionName],char(13),'')
 , [ThirdRegionName]=replace([ThirdRegionName],char(13),'')
 , [Unit]=replace([Unit],char(13),'')
 , [BusinessUnit]=replace([BusinessUnit],char(13),'')
 , [PersonInCharge]=replace([PersonInCharge],char(13),'')
 , [PicPhone]=replace([PicPhone],char(13),'')
 , [Contact]=replace([Contact],char(13),'')
 , [ContactPhone]=replace([ContactPhone],char(13),'')
 , [ContactEmail]=replace([ContactEmail],char(13),'')
 , [WebUrl]=replace([WebUrl],char(13),'')
 , [AttachmentPath]=replace([AttachmentPath],char(13),'')
 , [SelfEvaluationReport]=replace([SelfEvaluationReport],char(13),'')
 , [PioneerDeclaration]=replace([PioneerDeclaration],char(13),'')
 , [PioneerSelfAssessment]=replace([PioneerSelfAssessment],char(13),'')
 , [SelfAssessmentScore]=replace([SelfAssessmentScore],char(13),'')
 , [SelfAssessmentTotalScore]=replace([SelfAssessmentTotalScore],char(13),'')

 
update [dbo].[RAEP_Sys_Region]
 set [name] =replace([name],char(10),'')
update [dbo].[RAEP_Sys_Region]
 set [name] =replace([name],char(13),'')


 --	update 
--	s1 
--	set s1.infoid = infos.id
--	from 
--	[dbo].[RAEP_Infos] infos
--	left outer join [dbo].[s1] s1 on CHARINDEX(s1.t, infos.PioneerSelfAssessment) >0





declare @cnt int 
declare @infoStartIndex int = 33
declare @itemStartIndex int = 16

declare @itemCnt int = 24

select @cnt = count(1) from [dbo].[RAEP_Infos]

declare @i int = 0

--print @cnt

declare @sql nvarchar(1000)

--while @i < @cnt
--begin
--	--print @i

--	declare @j int = 0

--	while @j < @itemCnt
--	begin
--		set @sql = ''
--		declare @infoid int = @infoStartIndex + @i
--		set @sql = 'insert into raep_infoselfassessmentsummary select '+ cast(@infoid as varchar)+' as infoid, '+cast(@itemStartIndex + @j as varchar)+' as itemid, [s'+ cast(@j+1 as varchar)+'] from s1 where infoid = ' + cast(@infoid as varchar)
--		--exec sp_executesql @sql
--		--print @sql
--		set @j = @j + 1
--	end

--	set @i = @i + 1
--end

declare @z int = 0
while @z < @itemCnt
	begin
		set @sql = ''
		declare @infoid_inner int = 65
		set @sql = 'insert into raep_infoselfassessmentsummary select '+ cast(@infoid_inner as varchar)+' as infoid, '+cast(@itemStartIndex + @z as varchar)+' as itemid, [s'+ cast(@z+1 as varchar)+'] from s1 where infoid = ' + cast(@infoid_inner as varchar)
		--exec sp_executesql @sql
		print @sql
		set @z = @z + 1
	end

