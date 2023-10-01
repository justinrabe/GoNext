import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from awsglue import DynamicFrame


def sparkSqlQuery(glueContext, query, mapping, transformation_ctx) -> DynamicFrame:
    for alias, frame in mapping.items():
        frame.toDF().createOrReplaceTempView(alias)
    result = spark.sql(query)
    return DynamicFrame.fromDF(result, glueContext, transformation_ctx)


args = getResolvedOptions(sys.argv, ["JOB_NAME"])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args["JOB_NAME"], args)

# Script generated for node S3 bucket
S3bucket_node1 = glueContext.create_dynamic_frame.from_options(
    format_options={"multiline": False},
    connection_type="s3",
    format="json",
    connection_options={
        "paths": ["s3://power-rankings-dataset-gprhack/athena-ready/games/"],
        "recurse": True,
    },
    transformation_ctx="S3bucket_node1",
)

# Script generated for node Drop Fields
DropFields_node1696133605379 = DropFields.apply(
    frame=S3bucket_node1,
    paths=[
        "participants.keystoneID",
        "participants.hashedIP",
        "participants.teamID",
        "participants.participantID",
        "participants.championName",
        "participants.accountID",
        "participants.abGroup",
        "participants.perks.perkIds",
        "participants.perks.perkStyle",
        "participants.perks.perkSubStyle",
        "participants.perks",
        "participants.summonerName",
        "participants.summonerLevel",
        "participants.magicPenetrationPercent",
        "participants.primaryAbilityResource",
        "participants.spellVamp",
        "participants.cooldownReduction",
        "participants.lifeSteal",
        "participants.primaryAbilityResourceRegen",
        "participants.magicPenetrationPercentBonus",
        "participants.magicPenetration",
        "participants.healthMax",
        "participants.position.z",
        "participants.position.x",
        "participants.position",
        "participants.magicResist",
        "participants.primaryAbilityResourceMax",
        "participants.armorPenetrationPercentBonus",
        "participants.armorPenetrationPercent",
        "participants.attackDamage",
        "participants.ccReduction",
        "participants.currentGold",
        "participants.healthRegen",
        "participants.attackSpeed",
        "participants.XP",
        "participants.armor",
        "participants.level",
        "participants.armorPenetration",
        "participants.totalGold",
        "participants.health",
        "participants.abilityPower",
        "participants.stats.value",
        "participants.stats.name",
        "participants.stats",
        "participants.goldPerSecond",
        "participants",
        "sequenceIndex",
        "gameName",
        "gameVersion",
        "statsUpdateInterval",
        "playbackID",
        "gameTime",
        "nextDragonSpawnTime",
        "nextDragonName",
        "gameOver",
        "teams.inhibKills",
        "teams.towerKills",
        "teams.teamID",
        "teams.baronKills",
        "teams.dragonKills",
        "teams.assists",
        "teams.totalGold",
        "teams.championsKills",
        "teams.deaths",
        "teams",
        "itemID",
        "participantID",
        "goldGain",
        "itemBeforeUndo",
        "skillSlot",
        "participant",
        "evolved",
    ],
    transformation_ctx="DropFields_node1696133605379",
)

# Script generated for node SQL Query
SqlQuery0 = """
DELETE FROM lol.games g
WHERE from_iso8601_timestamp(g.eventtime) < cast('2022-12-31' as date)
"""
SQLQuery_node1696133638512 = sparkSqlQuery(
    glueContext,
    query=SqlQuery0,
    mapping={"myDataSource": DropFields_node1696133605379},
    transformation_ctx="SQLQuery_node1696133638512",
)

# Script generated for node S3 bucket
S3bucket_node2 = glueContext.write_dynamic_frame.from_options(
    frame=SQLQuery_node1696133638512,
    connection_type="s3",
    format="glueparquet",
    connection_options={"path": "s3://gameslol", "partitionKeys": ["eventTime"]},
    format_options={"compression": "snappy"},
    transformation_ctx="S3bucket_node2",
)

job.commit()
