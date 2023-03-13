DELIMITER $$
CREATE TRIGGER RSOStatusAddVerify AFTER INSERT ON rso_user FOR EACH ROW BEGIN
IF((SELECT COUNT(*) FROM rso_user M WHERE M.rsoID = NEW.rsoID) > 3)
THEN UPDATE rso 
SET 
	verified = true 
WHERE
	rsoID = NEW.rsoID;
END IF;
END;
$$

DELIMITER $$
CREATE TRIGGER RSOStatusRemoveVerify AFTER DELETE ON rso_user FOR EACH ROW BEGIN
IF((SELECT COUNT(*) FROM rso_user M WHERE M.rsoID = OLD.rsoID) < 4)
THEN UPDATE rso 
SET 
	verified = false 
WHERE
	rsoID = OLD.rsoID;
END IF;
END;
$$
