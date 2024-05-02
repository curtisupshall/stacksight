find:
	find . -type d -name .git -prune -o -type f -print | sed 's|^\./||'

clean:
	rm -rf python/.cims

.PHONY: find clean