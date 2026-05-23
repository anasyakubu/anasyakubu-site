// src/pages/WritingEditor.tsx
import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bold,
  Italic,
  Code,
  Code2,
  Heading,
  Quote,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Minus,
  Eye,
  Pencil,
  Download,
  Copy,
  Check,
  Trash2,
  Plus,
  FileJson,
} from 'lucide-react';
import { posts as seedPosts, slugify, estimateReadingTime, formatDate } from '../../data/posts';
import type { Post } from '../../data/posts';
import Markdown from '../../components/writing/Markdown';

/**
 * ADMIN EDITOR — local-draft workflow.
 *
 * Because the site is static, this editor cannot write to posts.json directly.
 * Instead it lets you compose posts with a full preview, then EXPORT the
 * complete posts.json (existing posts + your new/edited ones) for you to
 * paste into src/data/posts.json and commit.
 *
 * Working posts are held in component state for the session. "Saved" posts
 * are mirrored to localStorage so a refresh doesn't lose your drafts, but the
 * source of truth remains posts.json once you export + commit.
 *
 * SECURITY NOTE: this page has no auth. Either keep its route out of your
 * navbar and treat it as unlisted, or guard it (see the integration guide).
 */

// ---------- localStorage helpers ----------

const LS_KEY = 'portfolio:writing-drafts';

function loadDrafts(): Post[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Post[]) : [];
  } catch {
    return [];
  }
}

function saveDrafts(drafts: Post[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(drafts));
  } catch {
    /* storage full or unavailable */
  }
}

// ---------- Empty post factory ----------

function emptyPost(): Post {
  return {
    slug: '',
    title: '',
    excerpt: '',
    coverImage: '',
    tags: [],
    date: new Date().toISOString().slice(0, 10),
    readingTime: 1,
    featured: false,
    content: '',
  };
}

// ---------- Component ----------

const WritingEditor: React.FC = () => {
  // All posts the editor knows about = seed posts + any local drafts,
  // de-duplicated by slug (drafts win).
  const [drafts, setDrafts] = useState<Post[]>(() => loadDrafts());

  const allPosts = useMemo(() => {
    const map = new Map<string, Post>();
    seedPosts.forEach(p => map.set(p.slug, p));
    drafts.forEach(p => map.set(p.slug, p));
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [drafts]);

  const [form, setForm] = useState<Post>(() => emptyPost());
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [mobileView, setMobileView] = useState<'write' | 'preview'>('write');
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isNew = editingSlug === null;

  // ----- Field updates -----
  const update = <K extends keyof Post>(key: K, value: Post[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      // Auto-slug only while creating a new post (don't break existing URLs)
      slug: isNew ? slugify(title) : prev.slug,
    }));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      update('tags', [...form.tags, t]);
    }
    setTagInput('');
  };

  const removeTag = (t: string) =>
    update('tags', form.tags.filter(x => x !== t));

  // ----- Markdown toolbar: wrap/insert at cursor -----
  const surround = (before: string, after = before, placeholder = 'text') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = form.content.slice(start, end) || placeholder;
    const next =
      form.content.slice(0, start) +
      before +
      selected +
      after +
      form.content.slice(end);
    update('content', next);
    // Restore focus + selection after state flush
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    });
  };

  const insertBlock = (text: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const prefix = form.content.slice(0, start);
    const needsNewline = prefix.length > 0 && !prefix.endsWith('\n\n');
    const insertion = (needsNewline ? '\n\n' : '') + text + '\n';
    const next = prefix + insertion + form.content.slice(start);
    update('content', next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(
        start + insertion.length,
        start + insertion.length
      );
    });
  };

  // ----- Validation -----
  const errors = useMemo(() => {
    const e: string[] = [];
    if (!form.title.trim()) e.push('Title is required');
    if (!form.slug.trim()) e.push('Slug is required');
    if (!form.excerpt.trim()) e.push('Excerpt is required');
    if (!form.content.trim()) e.push('Content is empty');
    // Slug uniqueness (ignore the post currently being edited)
    const clash = allPosts.some(
      p => p.slug === form.slug && p.slug !== editingSlug
    );
    if (clash) e.push('Slug already exists — choose a unique one');
    return e;
  }, [form, allPosts, editingSlug]);

  const canSave = errors.length === 0;

  // ----- Actions -----
  const handleSave = () => {
    if (!canSave) return;
    const finalized: Post = {
      ...form,
      readingTime: estimateReadingTime(form.content),
    };
    // Replace if editing, else add
    const nextDrafts = (() => {
      const filtered = drafts.filter(d => d.slug !== editingSlug && d.slug !== finalized.slug);
      return [...filtered, finalized];
    })();
    setDrafts(nextDrafts);
    saveDrafts(nextDrafts);
    setEditingSlug(finalized.slug);
  };

  const handleEdit = (post: Post) => {
    setForm({ ...post });
    setEditingSlug(post.slug);
    setMobileView('write');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (slug: string) => {
    const isSeed = seedPosts.some(p => p.slug === slug);
    const msg = isSeed
      ? 'This post is in posts.json. Deleting here only removes the local draft — you must also remove it from posts.json and re-export. Continue?'
      : 'Delete this draft? This cannot be undone.';
    if (!window.confirm(msg)) return;
    const nextDrafts = drafts.filter(d => d.slug !== slug);
    setDrafts(nextDrafts);
    saveDrafts(nextDrafts);
    if (editingSlug === slug) handleNew();
  };

  const handleNew = () => {
    setForm(emptyPost());
    setEditingSlug(null);
    setMobileView('write');
  };

  // ----- Export -----
  const exportedJson = useMemo(
    () => JSON.stringify(allPosts, null, 2),
    [allPosts]
  );

  const downloadJson = () => {
    const blob = new Blob([exportedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'posts.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  // ---------- Render ----------
  return (
    <section className="relative bg-zinc-950 text-white min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
              <span>/ ADMIN</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="text-zinc-300">Writing Editor</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-[-0.03em] font-medium">
              {isNew ? 'New post' : 'Editing'}
              <span className="text-amber-400 italic font-light">.</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleNew}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/10 hover:border-white/30 rounded-full font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-300 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 rounded-full font-mono text-[10.5px] uppercase tracking-[0.15em] font-semibold transition-colors"
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
              {isNew ? 'Save draft' : 'Update'}
            </button>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-6 px-4 py-3 rounded-lg border border-rose-500/30 bg-rose-500/[0.05]">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rose-300 mb-1">
              Fix before saving
            </p>
            <ul className="text-[13px] text-rose-200/80 space-y-0.5">
              {errors.map((e, i) => (
                <li key={i}>· {e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Mobile view toggle */}
        <div className="flex lg:hidden gap-2 mb-5">
          <button
            onClick={() => setMobileView('write')}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-[10.5px] uppercase tracking-[0.15em] border transition-colors ${mobileView === 'write'
              ? 'bg-amber-400 border-amber-400 text-zinc-950 font-semibold'
              : 'border-white/10 text-zinc-400'
              }`}
          >
            <Pencil className="w-3.5 h-3.5" /> Write
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-[10.5px] uppercase tracking-[0.15em] border transition-colors ${mobileView === 'preview'
              ? 'bg-amber-400 border-amber-400 text-zinc-950 font-semibold'
              : 'border-white/10 text-zinc-400'
              }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>

        {/* ---------- Editor + Preview split ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ===== LEFT: form ===== */}
          <div
            className={`space-y-5 ${mobileView === 'preview' ? 'hidden lg:block' : ''
              }`}
          >
            {/* Meta fields */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 space-y-4">
              <EditorField label="Title">
                <input
                  type="text"
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="An honest, specific headline"
                  className="editor-input"
                />
              </EditorField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditorField label="Slug (URL)">
                  <input
                    type="text"
                    value={form.slug}
                    onChange={e => update('slug', slugify(e.target.value))}
                    placeholder="url-safe-slug"
                    className="editor-input font-mono text-[13px]"
                  />
                </EditorField>
                <EditorField label="Date">
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => update('date', e.target.value)}
                    className="editor-input font-mono text-[13px]"
                  />
                </EditorField>
              </div>

              <EditorField label="Excerpt">
                <textarea
                  value={form.excerpt}
                  onChange={e => update('excerpt', e.target.value)}
                  rows={2}
                  placeholder="One or two sentences shown on the listing page"
                  className="editor-input resize-none"
                />
              </EditorField>

              <EditorField label="Cover image URL">
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={e => update('coverImage', e.target.value)}
                  placeholder="https://… or /images/cover.jpg"
                  className="editor-input font-mono text-[13px]"
                />
              </EditorField>

              {/* Cover preview */}
              {form.coverImage && (
                <div className="relative aspect-[16/8] rounded-lg overflow-hidden border border-white/[0.08] bg-zinc-900">
                  <img
                    src={form.coverImage}
                    alt="cover preview"
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).style.opacity = '0.2';
                    }}
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-zinc-950/80 rounded font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-400">
                    Cover preview
                  </span>
                </div>
              )}

              {/* Tags */}
              <EditorField label="Tags">
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.tags.map(t => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] text-amber-300"
                    >
                      {t}
                      <button
                        onClick={() => removeTag(t)}
                        className="hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Type a tag, press Enter"
                  className="editor-input font-mono text-[13px]"
                />
              </EditorField>

              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => update('featured', !form.featured)}
                  className={`relative w-10 h-5.5 rounded-full transition-colors ${form.featured ? 'bg-amber-400' : 'bg-white/10'
                    }`}
                  style={{ height: '22px', width: '40px' }}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-zinc-950 transition-transform ${form.featured ? 'translate-x-[20px]' : 'translate-x-0.5'
                      }`}
                  />
                </button>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-300">
                  Featured post
                </span>
              </label>
            </div>

            {/* Markdown toolbar */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-white/[0.06]">
                <ToolbarBtn label="Heading" onClick={() => insertBlock('## Heading')}>
                  <Heading className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Bold" onClick={() => surround('**')}>
                  <Bold className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Italic" onClick={() => surround('*')}>
                  <Italic className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Inline code" onClick={() => surround('`')}>
                  <Code className="w-4 h-4" />
                </ToolbarBtn>
                <Divider />
                <ToolbarBtn
                  label="Code block"
                  onClick={() => insertBlock('```javascript\n// code\n```')}
                >
                  <Code2 className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Quote" onClick={() => insertBlock('> Quote')}>
                  <Quote className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn
                  label="Bullet list"
                  onClick={() => insertBlock('- Item\n- Item')}
                >
                  <List className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn
                  label="Numbered list"
                  onClick={() => insertBlock('1. Item\n2. Item')}
                >
                  <ListOrdered className="w-4 h-4" />
                </ToolbarBtn>
                <Divider />
                <ToolbarBtn
                  label="Image"
                  onClick={() => {
                    const url = window.prompt('Image URL:');
                    if (url)
                      insertBlock(`![caption](${url})`);
                  }}
                >
                  <ImageIcon className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn
                  label="Link"
                  onClick={() => {
                    const url = window.prompt('Link URL:');
                    if (url) surround('[', `](${url})`, 'link text');
                  }}
                >
                  <LinkIcon className="w-4 h-4" />
                </ToolbarBtn>
                <ToolbarBtn label="Divider" onClick={() => insertBlock('---')}>
                  <Minus className="w-4 h-4" />
                </ToolbarBtn>
              </div>

              {/* Content textarea */}
              <textarea
                ref={textareaRef}
                value={form.content}
                onChange={e => update('content', e.target.value)}
                placeholder="Write your post in Markdown…"
                spellCheck
                className="w-full bg-transparent px-4 py-4 font-mono text-[13.5px] leading-relaxed text-zinc-200 placeholder:text-zinc-600 outline-none resize-y min-h-[420px]"
              />
              <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">
                <span>{form.content.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>~{estimateReadingTime(form.content)} min read</span>
              </div>
            </div>
          </div>

          {/* ===== RIGHT: live preview ===== */}
          <div
            className={`${mobileView === 'write' ? 'hidden lg:block' : ''
              }`}
          >
            <div className="lg:sticky lg:top-6 bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                  Live preview
                </span>
              </div>

              <div className="max-h-[80vh] overflow-y-auto p-6">
                {/* Preview cover */}
                {form.coverImage && (
                  <div className="aspect-[16/9] rounded-lg overflow-hidden border border-white/[0.08] mb-6 bg-zinc-900">
                    <img
                      src={form.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Preview tags */}
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {form.tags.map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 bg-white/[0.03] border border-white/[0.08] rounded-full font-mono text-[9.5px] uppercase tracking-[0.15em] text-amber-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Preview title */}
                <h1 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.02em] text-white leading-[1.05]">
                  {form.title || 'Untitled post'}
                </h1>
                {form.excerpt && (
                  <p className="mt-3 text-zinc-400 leading-relaxed font-display font-light">
                    {form.excerpt}
                  </p>
                )}
                <div className="mt-4 mb-6 font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-500">
                  {formatDate(form.date)} · ~{estimateReadingTime(form.content)} min
                </div>

                <hr className="border-t border-white/[0.06] mb-6" />

                {/* Rendered markdown */}
                {form.content.trim() ? (
                  <Markdown content={form.content} />
                ) : (
                  <p className="font-mono text-[12px] uppercase tracking-[0.15em] text-zinc-600">
                    Start writing to see the preview…
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- All posts manager ---------- */}
        <div className="mt-12 bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileJson className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-300">
                All posts · {allPosts.length}
              </span>
            </div>
          </div>

          <div>
            {allPosts.map(p => {
              const isSeed = seedPosts.some(s => s.slug === p.slug);
              const isDraft = drafts.some(d => d.slug === p.slug);
              return (
                <div
                  key={p.slug}
                  className="flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[15px] font-medium text-white truncate">
                        {p.title}
                      </span>
                      {p.featured && (
                        <span className="px-1.5 py-0.5 bg-amber-400/15 rounded font-mono text-[8.5px] uppercase tracking-[0.1em] text-amber-400">
                          Featured
                        </span>
                      )}
                      {isDraft && !isSeed && (
                        <span className="px-1.5 py-0.5 bg-emerald-400/15 rounded font-mono text-[8.5px] uppercase tracking-[0.1em] text-emerald-300">
                          New draft
                        </span>
                      )}
                      {isDraft && isSeed && (
                        <span className="px-1.5 py-0.5 bg-sky-400/15 rounded font-mono text-[8.5px] uppercase tracking-[0.1em] text-sky-300">
                          Edited
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">
                      /{p.slug} · {formatDate(p.date)}
                    </span>
                  </div>

                  <Link
                    to={`/writing/${p.slug}`}
                    className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500 hover:text-amber-400 transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleEdit(p)}
                    className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.06] hover:border-amber-400/50 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors"
                    aria-label="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.slug)}
                    className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.06] hover:border-rose-500/50 flex items-center justify-center text-zinc-400 hover:text-rose-400 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Export ---------- */}
        <div className="mt-8 bg-gradient-to-br from-amber-400/[0.06] to-transparent border border-amber-400/20 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="max-w-xl">
              <h3 className="font-display text-xl font-medium text-white">
                Export <span className="text-amber-400">posts.json</span>
              </h3>
              <p className="mt-1.5 text-zinc-400 text-[13.5px] leading-relaxed">
                Download or copy the full JSON, then replace{' '}
                <code className="font-mono text-[12px] text-amber-300">
                  src/data/posts.json
                </code>{' '}
                in your repo and commit. That's what makes posts go live.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={copyJson}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/10 hover:border-white/30 rounded-full font-mono text-[10.5px] uppercase tracking-[0.15em] text-zinc-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
              <button
                onClick={downloadJson}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-full font-mono text-[10.5px] uppercase tracking-[0.15em] font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped input styles */}
      <style>{`
        .editor-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          color: white;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .editor-input::placeholder { color: #52525b; }
        .editor-input:focus { border-color: rgba(251,191,36,0.5); }
      `}</style>
    </section>
  );
};

// ---------- Sub-components ----------

const EditorField: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div>
    <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const ToolbarBtn: React.FC<{
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    className="w-8 h-8 rounded-md flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:bg-white/[0.05] transition-colors"
  >
    {children}
  </button>
);

const Divider: React.FC = () => (
  <span className="w-px h-5 bg-white/10 mx-1" />
);

export default WritingEditor;