find:
	find . -type d -name .git -prune -o -type f -print | sed 's|^\./||'

.PHONY: find