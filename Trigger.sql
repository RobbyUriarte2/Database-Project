-- RSO Adding verification
DELIMITER $$
CREATE TRIGGER RSOStatusAddVerify AFTER INSERT ON rso_user FOR EACH ROW BEGIN
IF((SELECT COUNT(*) FROM rso_user M WHERE M.rsoID = NEW.rsoID) > 4)
THEN UPDATE rso 
SET 
	verified = true 
WHERE
	rsoID = NEW.rsoID;
END IF;
END;
$$

-- RSO Removing Verification
DELIMITER $$
CREATE TRIGGER RSOStatusRemoveVerify AFTER DELETE ON rso_user FOR EACH ROW BEGIN
IF((SELECT COUNT(*) FROM rso_user M WHERE M.rsoID = OLD.rsoID) < 5)
THEN UPDATE rso 
SET 
	verified = false 
WHERE
	rsoID = OLD.rsoID;
END IF;
END;
$$

-- Making sure events dont happen at the same time
DELIMITER $$
CREATE TRIGGER CHECK_EVENT_TIME_LOCATION BEFORE INSERT ON event FOR EACH ROW BEGIN
IF
((SELECT COUNT(*) from event WHERE event.latitude = NEW.latitude AND event.longitude = NEW.longitude AND 
((event.eventStart <= NEW.eventStart AND event.eventEnd >= NEW.eventStart) OR (event.eventStart <= NEW.eventEnd AND event.eventEnd >= NEW.eventEnd) OR (event.eventStart >= NEW.eventEnd AND event.eventEnd <= NEW.eventEnd))
)) > 0
THEN 
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "No two events can happen at the same time and place";
END IF;
END;
$$
