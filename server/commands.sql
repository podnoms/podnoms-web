SELECT * FROM Users
SELECT * FROM Podcasts
SELECT * FROM PodcastEntries

SELECT Id, Uid, Title FROM PodcastEntries
DELETE FROM PodcastEntries
DELETE FROM Podcasts


SELECT * FROM __EFMigrationsHistory

SELECT slug FROM Users


DROP TABLE __EFMigrationsHistory

DROP TABLE PodcastEntries
DROP TABLE Podcasts
DROP TABLE Users

DROP TABLE Hangfire.[Schema]
DROP TABLE Hangfire.State
DROP TABLE Hangfire.JobParameter
DROP TABLE Hangfire.JobQueue
DROP TABLE Hangfire.Server
DROP TABLE Hangfire.List
DROP TABLE Hangfire.[Set]
DROP TABLE Hangfire.Counter
DROP TABLE Hangfire.Hash
DROP TABLE Hangfire.AggregatedCounter

DROP TABLE Hangfire.Job

