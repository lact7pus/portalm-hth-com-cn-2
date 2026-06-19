// assets/content-map.js

const contentSections = {
  home: {
    title: "首页",
    tags: ["华体会", "体育", "电竞", "综合"],
    keywords: ["华体会体育", "华体会电竞", "华体会综合"],
    url: "https://portalm-hth.com.cn",
    description: "平台首页，汇聚最新赛事与活动资讯。"
  },
  sports: {
    title: "体育赛事",
    tags: ["华体会", "足球", "篮球", "网球", "体育"],
    keywords: ["华体会体育", "足球赛事", "篮球联赛", "网球公开赛"],
    url: "https://portalm-hth.com.cn/sports",
    description: "涵盖全球热门体育赛事直播与数据。"
  },
  esports: {
    title: "电竞赛事",
    tags: ["华体会", "电竞", "LOL", "DOTA2", "CSGO"],
    keywords: ["华体会电竞", "英雄联盟", "刀塔2", "反恐精英"],
    url: "https://portalm-hth.com.cn/esports",
    description: "专业电竞赛事平台，支持多款热门游戏。"
  },
  live: {
    title: "直播中心",
    tags: ["华体会", "直播", "互动"],
    keywords: ["华体会直播", "实时互动", "赛事直播"],
    url: "https://portalm-hth.com.cn/live",
    description: "高清流畅的赛事直播与即时互动体验。"
  },
  results: {
    title: "赛果查询",
    tags: ["华体会", "赛果", "数据"],
    keywords: ["华体会赛果", "比赛数据", "历史战绩"],
    url: "https://portalm-hth.com.cn/results",
    description: "快速查询历史比赛结果与详细数据。"
  }
};

const tagList = [
  "华体会",
  "足球",
  "篮球",
  "网球",
  "电竞",
  "LOL",
  "DOTA2",
  "CSGO",
  "直播",
  "互动",
  "赛果",
  "数据"
];

const siteUrl = "https://portalm-hth.com.cn";
const coreKeyword = "华体会";

/**
 * 根据关键词搜索匹配的内容分区
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的分区对象数组
 */
function searchContent(query) {
  if (!query || query.trim() === "") {
    return Object.values(contentSections);
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const key in contentSections) {
    const section = contentSections[key];
    const matchFields = [
      section.title,
      ...section.tags,
      ...section.keywords,
      section.description
    ];

    const isMatch = matchFields.some(field =>
      field.toLowerCase().includes(lowerQuery)
    );

    if (isMatch) {
      results.push(section);
    }
  }

  return results;
}

/**
 * 根据标签筛选内容分区
 * @param {string} tag - 标签名称
 * @returns {Array} 包含指定标签的分区数组
 */
function filterByTag(tag) {
  if (!tag || tag.trim() === "") {
    return Object.values(contentSections);
  }

  const lowerTag = tag.toLowerCase().trim();
  return Object.values(contentSections).filter(section =>
    section.tags.some(t => t.toLowerCase() === lowerTag)
  );
}

/**
 * 获取所有分区的标签统计
 * @returns {Object} 每个标签的计数
 */
function getTagStats() {
  const stats = {};
  for (const section of Object.values(contentSections)) {
    for (const tag of section.tags) {
      stats[tag] = (stats[tag] || 0) + 1;
    }
  }
  return stats;
}

// 示例数据：最近搜索记录（最多保存5条）
const recentSearches = [];

function addRecentSearch(query) {
  if (!query || query.trim() === "") return;
  const trimmed = query.trim();
  const index = recentSearches.indexOf(trimmed);
  if (index !== -1) {
    recentSearches.splice(index, 1);
  }
  recentSearches.unshift(trimmed);
  if (recentSearches.length > 5) {
    recentSearches.pop();
  }
}

// 对外暴露接口（适用于浏览器或CommonJS环境）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentSections,
    tagList,
    siteUrl,
    coreKeyword,
    searchContent,
    filterByTag,
    getTagStats,
    recentSearches,
    addRecentSearch
  };
}