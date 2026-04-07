import re


class PasswordStrengthService:

    def check_strength(self, password: str):

        score = 0
        feedback = []

        if len(password) >= 8:
            score += 1
        else:
            feedback.append("Password should be at least 8 characters")

        if re.search(r"[A-Z]", password):
            score += 1
        else:
            feedback.append("Add uppercase letters")

        if re.search(r"[a-z]", password):
            score += 1
        else:
            feedback.append("Add lowercase letters")

        if re.search(r"[0-9]", password):
            score += 1
        else:
            feedback.append("Add numbers")

        if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            score += 1
        else:
            feedback.append("Add special characters")

        strength = self.get_strength(score)

        return {
            "score": score,
            "strength": strength,
            "feedback": feedback
        }

    def get_strength(self, score):

        if score <= 2:
            return "weak"

        elif score == 3:
            return "medium"

        elif score == 4:
            return "strong"

        else:
            return "very_strong"